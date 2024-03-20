import os
from dotenv import load_dotenv
from flask import (
    Flask,
    request,
    g,
    jsonify,
)
from flask_cors import CORS
from werkzeug.datastructures import MultiDict
from sqlalchemy.exc import IntegrityError

from models import db, connect_db, Ticket
from forms import TicketSubmit

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

load_dotenv()

app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ['DATABASE_URL'].replace("postgres://", "postgresql://")
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False

connect_db(app)


@app.route('/tickets', methods=["POST"])
def new_ticket():
    """
    Create new ticket
    """

    data = MultiDict(mapping=request.json)
    form = TicketSubmit(data)

    if form.validate():
        client_name = form["client_name"]
        client_email = form["client_email"]
        description = form["description"]

        try:
            Ticket.create_new_ticket(
                client_name=client_name,
                client_email=client_email,
                description=description,
            )

            db.session.commit()

        except IntegrityError as e:
            return jsonify({'errors': e.__repr__()}), 400

        return jsonify({'success': 'New ticket submitted'}), 201

    return jsonify(errors=form.errors), 400
