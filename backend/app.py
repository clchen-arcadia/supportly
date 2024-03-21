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

from models import db, connect_db, User, Ticket
from forms import UserLogin, UserSignup, TicketSubmit

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
app.config['WTF_CSRF_ENABLED'] = False

connect_db(app)


@app.route('/signup/', methods=["POST"])
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
            token = User.signup(email, password, is_admin)
            db.session.commit()

        except IntegrityError as e:
            print("ERR: ", e)
            return jsonify({'errors': "Email already exists."}), 400

        return jsonify({"token": token}), 201

    else:
        messages = []
        for err in form.errors:
            joined_messages = " ".join(form.errors[err])
            messages.append(f"{err}: {joined_messages}")
        return jsonify({'errors': messages}), 400


@app.route('/login/', methods=["POST"])
def login():
    """
    Handle user login
    """

    data = MultiDict(mapping=request.json)
    form = UserLogin(data)

    if form.validate():
        email = form.data["email"]
        password = form.data["password"]

        token = User.login(email, password)

        if token:
            return jsonify({'token': token}), 200
        else:
            return jsonify({'error': 'Invalid username/password'}), 400

    return jsonify(errors=form.errors), 400


@app.route('/tickets/', methods=["POST"])
def new_ticket():
    """
    Create new ticket
    """

    data = MultiDict(mapping=request.json)
    form = TicketSubmit(data)

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
            return jsonify({'errors': e.__repr__()}), 400

        return jsonify({'success': 'New ticket submitted'}), 201

    return jsonify(errors=form.errors), 400
