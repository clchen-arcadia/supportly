import jwt
import os
from dotenv import load_dotenv

load_dotenv()

secret_key = os.getenv('SECRET_KEY')


def create_token(user):

    id = user.id
    email = user.email
    is_admin = user.is_admin

    payload = {
        'userId': id,
        'email': email,
        'isAdmin': is_admin,
    }

    token = jwt.encode(
        payload,
        secret_key,
        algorithm='HS256'
    )

    return token
