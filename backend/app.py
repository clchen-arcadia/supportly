import os
from dotenv import load_dotenv
from flask import Flask, request, g
import jwt
from flask_cors import CORS
from models import connect_db

import backend.routes.auth as auth
import backend.routes.tickets as tickets

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

load_dotenv()
app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["DATABASE_URL"].replace("postgres://", "postgresql://")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = False
app.config["WTF_CSRF_ENABLED"] = False

connect_db(app)

app.register_blueprint(auth.bp)
app.register_blueprint(tickets.bp)


@app.before_request
def add_user_to_g():
    """If logged in, add current user to Flask global."""

    if "token" in request.headers:
        token = request.headers["token"]
        try:
            payload = jwt.decode(
                token,
                app.config["SECRET_KEY"],
                algorithms=["HS256"],
                options={"verify_signature": True},
            )
            g.user = payload
        except (jwt.exceptions.InvalidSignatureError,
                jwt.exceptions.DecodeError) as e:
            print("INVALID SIG, ERR IS", e)
            g.user = None

    else:
        g.user = None
