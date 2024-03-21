import jwt
import os
from dotenv import load_dotenv

load_dotenv()

secret_key = os.getenv('SECRET_KEY')


def create_token(user):

    email = user.email
    is_admin = user.is_admin

    payload = {
        'email': email,
        'is_admin': is_admin,
    }

    token = jwt.encode(
        payload,
        secret_key,
        algorithm='HS256'
    )

    return token
