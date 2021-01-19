from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin
from django.conf import settings
from taggit.managers import TaggableManager
import reversion

class UserManager(BaseUserManager):
    """ A manager class for instantiating and updting users 
    """

    def create_user(self, email, password=None, first_name="",
                    last_name="", **extra_fields):
        """creates and saves new user"""
        if not email:
            raise ValueError('User email is required')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.first_name = first_name
        user.last_name = last_name
        user.save(using=self._db)
        profile = Profile(user=user)
        profile.save(using=self._db)
        user.profile = profile
        return user

    def create_superuser(self, email, password, first_name="", last_name=""):
        """creates and saves new super user"""
        user = self.create_user(email, password, first_name, last_name)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        # profile
        profile = Profile(user=user)
        user.profile.save()
        user.profile.email_confirmed = True
        user.profile.password_reset = False
        profile.save(using=self._db)
        user.profile = profile
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """custom user model that supports email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    is_Researcher = models.BooleanField(default=False)

    # is_active and is_staff are still there since they are used by the django/contrib/auth/admin.py
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return  self.username + " " + self.email

class Profile(models.Model):
    """Profile of a user related to authentication features"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    # Authentication attributes
    email_confirmed = models.BooleanField(default=False)
    password_reset = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email + " " + str(self.email_confirmed) + " " + str(self.password_reset)

class DiagramStat(models.Model):
    threats = models.IntegerField(default=0)
    consequences = models.IntegerField(default=0)
    barriers = models.IntegerField(default=0)
    time_Spent = models.FloatField(default=0)

@reversion.register()
class Diagram(models.Model):
    """Diagram created by user"""
    diagram = models.TextField(default="")
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        to_field='id',
        on_delete=models.CASCADE)

    is_public = models.BooleanField(default=False)
    reader = models.ManyToManyField(User, related_name="readers")
    writer = models.ManyToManyField(User, related_name="writers")
    tags = TaggableManager()
    description = models.TextField(default="")
    hours_spent = models.FloatField(default=0)

    diagram_stat = models.ForeignKey(DiagramStat,
                                     on_delete=models.CASCADE)
    def __str__(self):
        return self.name



