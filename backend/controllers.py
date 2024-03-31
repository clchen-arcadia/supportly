from flask import jsonify
from sqlalchemy.exc import IntegrityError
from models import db, Ticket, Status, User
from token_helpers import create_token


def signup_new_user(email, password, is_admin):
    """Attempts to commit new user and returns JSON response"""

    try:
        user = User.signup(email, password, is_admin)
        db.session.commit()
        return jsonify({"token": create_token(user)}), 201
    except IntegrityError as e:
        print("ERR: ", e)
        return jsonify({"errors": "Email already exists."}), 400


def login_user(email, password):
    """Attempts to log in user and returns JSON response"""

    user = User.login(email, password)
    if user:
        return jsonify({"token": create_token(user)}), 200
    else:
        return jsonify({"error": "Invalid email/password"}), 400


def get_all_tickets():
    """Returns all tickets by descending id number"""

    tickets = []
    for ticket in Ticket.query.order_by(Ticket.id.desc()).all():
        tickets.append(ticket.to_dict())

    return tickets


def create_new_ticket(client_name, client_email, description):
    """Attempts to commit new ticket and returns JSON response"""

    try:
        Ticket.create_new_ticket(
            client_name=client_name,
            client_email=client_email,
            description=description,
        )
        db.session.commit()
        return jsonify({"message": "New ticket submitted"}), 201
    except IntegrityError as e:
        return jsonify({"errors": e.__repr__()}), 400


def patch_ticket_status(ticket, new_status):
    """Returns JSON response on success or 400"""

    status = Status.query.filter_by(status_name=new_status).first()
    if not status:
        return jsonify({"error": "No such status."}), 404

    try:
        ticket.status_name = status.status_name
        db.session.commit()
    except IntegrityError as e:
        return jsonify({"errors": e.__repr__()}), 400

    return jsonify({"message": "Successfully updated ticket"}), 200
