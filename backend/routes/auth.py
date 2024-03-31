from flask import Blueprint, request, jsonify
from werkzeug.datastructures import MultiDict
from forms import UserLogin, UserSignup
from sqlalchemy.exc import IntegrityError
from models import db, User
from middleware import ensure_logged_in
from token_helpers import create_token

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route("/signup/", methods=["POST"])
def signup():
    """Handle user signup"""

    data = MultiDict(mapping=request.json)
    form = UserSignup(data)

    if form.validate():
        email = form.data["email"]
        password = form.data["password"]
        is_admin = form.data["is_admin"]

        try:
            user = User.signup(email, password, is_admin)
            db.session.commit()
            return jsonify({"token": create_token(user)}), 201
        except IntegrityError as e:
            print("ERR: ", e)
            return jsonify({"errors": "Email already exists."}), 400

    else:
        messages = []
        for err in form.errors:
            joined_messages = " ".join(form.errors[err])
            messages.append(f"{err}: {joined_messages}")
        return jsonify({"errors": messages}), 400


@bp.route("/login/", methods=["POST"])
def login():
    """Handle user login"""

    data = MultiDict(mapping=request.json)
    form = UserLogin(data)

    if form.validate():
        email = form.data["email"]
        password = form.data["password"]
        user = User.login(email, password)
        if user:
            return jsonify({"token": create_token(user)}), 200
        else:
            return jsonify({"error": "Invalid email/password"}), 400

    else:
        messages = []
        for err in form.errors:
            joined_messages = " ".join(form.errors[err])
            messages.append(f"{err}: {joined_messages}")
        return jsonify({"errors": messages}), 400


@bp.route("/users/<user_id>/", methods=["GET"])
@ensure_logged_in
def get_user(user_id):
    """Get user by id"""
    user = User.query.get_or_404(user_id)
    return jsonify({"user": user.to_dict()}), 200
