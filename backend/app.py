import os
import sys
from dotenv import load_dotenv
from flask import (
    Flask,
    request,
    g,
    jsonify,
)
import jwt
from flask_cors import CORS
from werkzeug.datastructures import MultiDict
from sqlalchemy.exc import IntegrityError

from middleware import ensure_admin, ensure_logged_in
from models import db, connect_db, User, Ticket, Status
from forms import (
    UserLogin,
    UserSignup,
    TicketNewForm,
    TicketStatusPatchForm,
    TicketResponseForm,
)
from token_helpers import create_token

import logging

app = Flask(__name__)

cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

load_dotenv()

app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["DATABASE_URL"].replace(
    "postgres://", "postgresql://"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = False
app.config["WTF_CSRF_ENABLED"] = False

connect_db(app)

root = logging.getLogger()
root.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.INFO)
formatter = logging\
    .Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

app.logger.setHandler(handler)


@app.before_request
def add_user_to_g():
    """
    If logged in, add current user to Flask global.
    """

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


@app.route("/signup/", methods=["POST"])
def signup():
    """
    Handle user signup
    """

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


@app.route("/login/", methods=["POST"])
def login():
    """
    Handle user login
    """

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


@app.route("/users/<user_id>/", methods=["GET"])
@ensure_logged_in
def get_user(user_id):
    """
    Get user by id
    """
    user = User.query.get_or_404(user_id)
    return jsonify({"user": user.to_dict()}), 200


@app.route("/tickets/", methods=["GET"])
@ensure_admin
def get_all_tickets():
    """
    Get all tickets.
    Returns them by descending id number.
    """

    tickets = []
    for ticket in Ticket.query.order_by(Ticket.id.desc()).all():
        tickets.append(ticket.to_dict())

    return jsonify({"tickets": tickets}), 200


@app.route("/tickets/", methods=["POST"])
def new_ticket():
    """
    Create new ticket
    """

    data = MultiDict(mapping=request.json)
    form = TicketNewForm(data)

    if form.validate():
        client_name = form.data["name"]
        client_email = form.data["email"]
        description = form.data["description"]

        try:
            Ticket.create_new_ticket(
                client_name=client_name,
                client_email=client_email,
                description=description,
            )

            db.session.commit()

        except IntegrityError as e:
            return jsonify({"errors": e.__repr__()}), 400

        return jsonify({"message": "New ticket submitted"}), 201

    else:
        messages = []
        for err in form.errors:
            joined_messages = " ".join(form.errors[err])
            messages.append(f"{err}: {joined_messages}")
        return jsonify({"errors": messages}), 400


@app.route("/tickets/<ticket_id>/", methods=["PATCH"])
@ensure_admin
def update_ticket_status(ticket_id):
    """
    Update ticket status
    """

    ticket = Ticket.query.get_or_404(ticket_id)

    data = MultiDict(mapping=request.json)
    form = TicketStatusPatchForm(data)

    if form.validate():
        new_status = form.data["new_status"]

        status = Status.query.filter_by(status_name=new_status).first()

        if not status:
            return jsonify({"error": "No such status."}), 404

        try:
            ticket.status_name = status.status_name
            db.session.commit()

        except IntegrityError as e:
            return jsonify({"errors": e.__repr__()}), 400

        return jsonify({"message": "Successfully updated ticket"}), 200

    else:
        messages = []
        for err in form.errors:
            joined_messages = " ".join(form.errors[err])
            messages.append(f"{err}: {joined_messages}")
        return jsonify({"errors": messages}), 400


@app.route("/tickets/<ticket_id>/email/", methods=["POST"])
@ensure_admin
def send_ticket_response(ticket_id):
    """
    Simulate sending an email
    To respond to a ticket
    """

    ticket = Ticket.query.get_or_404(ticket_id)

    data = MultiDict(mapping=request.json)
    form = TicketResponseForm(data)

    if form.validate():
        response = form.data["response"]

        logging.info("SENDING EMAIL")
        logging.info("==========================================")
        logging.info("mailto: ", ticket.client_email)
        logging.info("subject: ", f"Regarding ticket: {ticket.id}")
        logging.info("body: ", f"Dear {ticket.client_name}. {response}")

        return jsonify({"message": "Successfully sent response"}), 200

    else:
        messages = []
        for err in form.errors:
            joined_messages = " ".join(form.errors[err])
            messages.append(f"{err}: {joined_messages}")
        return jsonify({"errors": messages}), 400
