import time

from django.db import connections
from django.db.utils import OperationalError
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    """django command to pause execution util database is available"""
    def handle(self, *args, **options):
        self.stdout.write('Waiting for database...')
        db_connection = None
        while not db_connection:
            try:
                db_connection = connections['default']
            except OperationalError:
                self.stdout.write('failed connecting to Database, retrying in 1s')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('Database connection established'))
