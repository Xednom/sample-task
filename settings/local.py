from .base import *


ALLOWED_HOSTS = ['*']

CORS_ORIGIN_WHITELIST = [
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": env("DATABASE_NAME"),
        "USER": env("DATABASE_USER"),
        "PASSWORD": env("DATABASE_PASSWORD"),
        "HOST": env("DATABASE_HOST"),
        "PORT": env("DATABASE_PORT"),
        "OPTIONS": {"init_command": "SET sql_mode='STRICT_TRANS_TABLES'",},
    }
}
