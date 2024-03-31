from flask import Blueprint, request, jsonify
from werkzeug.datastructures import MultiDict
from forms import TicketNewForm, TicketStatusPatchForm, TicketResponseForm
from models import Ticket
from middleware import ensure_admin
from services import get_form_errors, send_ticket_dummy_email
from controllers import get_all_tickets, create_new_ticket, patch_ticket_status

bp = Blueprint('tickets', __name__, url_prefix='/tickets')


@bp.route("/", methods=["GET"])
@ensure_admin
def get_tickets_route():
    """Get all tickets"""

    return jsonify({"tickets": get_all_tickets()}), 200


@bp.route("/", methods=["POST"])
def post_ticket_route():
    """Create new ticket"""

    data = MultiDict(mapping=request.json)
    form = TicketNewForm(data)

    if form.validate():
        client_name = form.data["name"]
        client_email = form.data["email"]
        description = form.data["description"]

        return create_new_ticket(client_name, client_email, description)
    else:
        return jsonify({"errors": get_form_errors(form)}), 400


@bp.route("/<ticket_id>/", methods=["PATCH"])
@ensure_admin
def patch_ticket_route(ticket_id):
    """Update ticket status"""

    ticket = Ticket.query.get_or_404(ticket_id)
    data = MultiDict(mapping=request.json)
    form = TicketStatusPatchForm(data)

    if form.validate():
        new_status = form.data["new_status"]
        return patch_ticket_status(ticket, new_status)
    else:
        return jsonify({"errors": get_form_errors(form)}), 400


@bp.route("/<ticket_id>/email/", methods=["POST"])
@ensure_admin
def ticket_response_route(ticket_id):
    """Simulate sending an email to respond to a ticket"""

    ticket = Ticket.query.get_or_404(ticket_id)
    data = MultiDict(mapping=request.json)
    form = TicketResponseForm(data)

    if form.validate():
        response = form.data["response"]
        send_ticket_dummy_email(ticket, response)
        return jsonify({"message": "Successfully sent response"}), 200
    else:
        return jsonify({"errors": get_form_errors(form)}), 400
