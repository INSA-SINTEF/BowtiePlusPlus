#!/bin/bash
# Automatically create admin user in application
sudo docker-compose run -u root api sh -c  "python3 manage.py createsuperuser"
