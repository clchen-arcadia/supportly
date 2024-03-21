from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

from token_helpers import create_token

db = SQLAlchemy()
bcrypt = Bcrypt()

TICKET_INITIAL_STATUS = 'new'


class User(db.Model):
    """
    User class.
    """

    __tablename__ = "users"

    email = db.Column(db.Text, primary_key=True, unique=True)
    password = db.Column(db.Text, nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=True)

    def to_dict(self):
        """Serializer user to dict"""

        return {
            "email": self.email,
            "isAdmin": self.is_admin,
        }

    @classmethod
    def signup(cls, email, password, is_admin=True):
        """
        Signup user.
        """

        hashed_password = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            email=email,
            password=hashed_password,
            is_admin=is_admin,
        )

        db.session.add(user)
        token = create_token(user)

        return token


class Ticket(db.Model):
    """
    Support ticket class.
    """

    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    client_name = db.Column(db.String(120), nullable=False)
    client_email = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(1800), nullable=False)
    status_name = db.Column(db.Text, db.ForeignKey('statuses.status_name'))

    status = db.relationship('Status', backref='tickets')

    def to_dict(self):
        """Serializer ticket to dict"""

        return {
            "id": self.id,
            "clientName": self.client_name,
            "clientEmail": self.client_email,
            "description": self.description,
            "status": self.status,
        }

    @classmethod
    def create_new_ticket(cls, client_name, client_email, description):
        ticket = Ticket(
            client_name=client_name,
            client_email=client_email,
            description=description,
            status_name=TICKET_INITIAL_STATUS,
        )

        db.session.add(ticket)
        return ticket


class Status(db.Model):
    """
    Status class for Tickets
    """

    __tablename__ = "statuses"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status_name = db.Column(db.String(120), nullable=False, unique=True)


def connect_db(app):
    """
    Connect Flask app to the database.
    """

    app.app_context().push()
    db.app = app
    db.init_app(app)
