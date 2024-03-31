from flask import Blueprint, request, jsonify
from werkzeug.datastructures import MultiDict
from forms import TicketNewForm, TicketStatusPatchForm, TicketResponseForm
from sqlalchemy.exc import IntegrityError
from models import db, Ticket, Status
from middleware import ensure_admin

bp = Blueprint('tickets', __name__, url_prefix='/tickets')


@bp.route("/", methods=["GET"])
@ensure_admin
def get_all_tickets():
    """Get all tickets by descending id number"""

    tickets = []
    for ticket in Ticket.query.order_by(Ticket.id.desc()).all():
        tickets.append(ticket.to_dict())

    return jsonify({"tickets": tickets}), 200


@bp.route("/", methods=["POST"])
def new_ticket():
    """Create new ticket"""

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


@bp.route("/<ticket_id>/", methods=["PATCH"])
@ensure_admin
def update_ticket_status(ticket_id):
    """Update ticket status"""

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


@bp.route("/<ticket_id>/email/", methods=["POST"])
@ensure_admin
def send_ticket_response(ticket_id):
    """Simulate sending an email to respond to a ticket"""

    ticket = Ticket.query.get_or_404(ticket_id)
    data = MultiDict(mapping=request.json)
    form = TicketResponseForm(data)
    if form.validate():
        response = form.data["response"]

        print("SENDING EMAIL", flush=True)
        print("==========================================", flush=True)
        print("mailto: ", ticket.client_email, flush=True)
        print("subject: ", f"Regarding ticket: {ticket.id}", flush=True)
        print("body: ", f"Dear {ticket.client_name}. {response}", flush=True)

        return jsonify({"message": "Successfully sent response"}), 200
    else:
        messages = []
        for err in form.errors:
            joined_messages = " ".join(form.errors[err])
            messages.append(f"{err}: {joined_messages}")
        return jsonify({"errors": messages}), 400
