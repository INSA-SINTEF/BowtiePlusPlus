from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from core.models import Profile
from django.forms import ValidationError
import django.contrib.auth.password_validation as validators
from django.utils import timezone
from user.validators import  LowercaseValidator, UppercaseValidator, SymbolValidator
from user.authentication import PasswordResetToken
from django.core import mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode


class UserSerializer(serializers.Serializer):
    """Authentication and creation serializer for user model"""

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True,  allow_blank=False, trim_whitespace=True)
    username = serializers.CharField()


    def create(self, validated_data):
        """Create new user and return it"""

        user = get_user_model().objects.create_user(**validated_data)
        if user is None:
            serializers.ValidationError("Validation error", code='authentication')
        return user

class ProfileSerializer(serializers.Serializer):
    """Serializer for user role"""

    email_confirmed = serializers.BooleanField()
    two_factor_enabled = serializers.BooleanField()

    def validate(self, attrs):
        return attrs


class UserInfoSerializer(serializers.Serializer):
    """Serializer for user information"""


    email = serializers.EmailField()
    is_Researcher = serializers.BooleanField()
    username = serializers.CharField()
    profile = ProfileSerializer(required=False)

    def validate(self, attrs):
        return attrs

class UserUpdateSerialize(serializers.Serializer):
    """ Serializer for update password """


    new_password = serializers.CharField(allow_blank=False, trim_whitespace=True)
    old_password = serializers.CharField(allow_blank=False, trim_whitespace=True)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user')
        super().__init__(*args, **kwargs)

    def validate(self, attrs):
        """ Validate method"""

        new_password = attrs.get("new_password")
        old_password = attrs.get("old_password")

        if not authenticate(request=self.context.get('request'),
                        username=self.user.email,
                        password=old_password):

            raise serializers.ValidationError("Wrong password")
        
        if new_password == old_password:
            raise serializers.ValidationError("The two passwords must be different")

        validators.validate_password(new_password)

        return attrs

    def __str__(self):
        return "required fields old_password and new_password"

class PasswordResetSerializer(serializers.Serializer):
    """Password reset serializer"""
    email = serializers.EmailField()

    def __init__(self, *args, **kwargs):
        self.url = kwargs.pop('url')
        super().__init__(*args, **kwargs)

    def validate(self, attrs):
        """Validate the password reset form"""
        
        user = get_user_model().objects.filter(email=attrs.get('email')).first()
        if not user is None:
            token = PasswordResetToken().make_token(user)
            message = "To reset your account password for Bowtie++ please click on the following"\
            + "link %s" % ( self.url % (urlsafe_base64_encode(force_bytes(user.pk)), token))
            subject = 'Reset password for Bowtie++'

            mail.send_mail(subject, message, 'no-reply@Bowtie', [user.email], fail_silently=False)

        return attrs


class AuthTokenSerialize(serializers.Serializer):
    """Serializer for user authentication object"""

    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def __str__(self):
        return "required fields: email and password"

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(request=self.context.get('request'),
                            username=email,
                            password=password
        )

        if user :
            attrs['user'] = user
            Profile.objects.filter(user=user).update(last_login=timezone.now())
            return attrs

        msg = _('Authentication failed')
        raise serializers.ValidationError(msg, code='authentication')
