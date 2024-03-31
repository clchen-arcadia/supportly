from flask import Blueprint, request, jsonify
from werkzeug.datastructures import MultiDict
from forms import UserLogin, UserSignup
from models import db, User
from middleware import ensure_logged_in
from services import get_form_errors
from controllers import signup_new_user, login_user

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route("/signup/", methods=["POST"])
def signup_route():
    """Handle user signup"""

    data = MultiDict(mapping=request.json)
    form = UserSignup(data)

    if form.validate():
        email = form.data["email"]
        password = form.data["password"]
        is_admin = form.data["is_admin"]
        return signup_new_user(email, password, is_admin)
    else:
        return jsonify({"errors": get_form_errors(form)}), 400


@bp.route("/login/", methods=["POST"])
def login_route():
    """Handle user login"""

    data = MultiDict(mapping=request.json)
    form = UserLogin(data)

    if form.validate():
        email = form.data["email"]
        password = form.data["password"]
        return login_user(email, password)
    else:
        return jsonify({"errors": get_form_errors(form)}), 400


@bp.route("/users/<user_id>/", methods=["GET"])
@ensure_logged_in
def get_user_route(user_id):
    """Get user by id"""

    user = User.query.get_or_404(user_id)
    return jsonify({"user": user.to_dict()}), 200
