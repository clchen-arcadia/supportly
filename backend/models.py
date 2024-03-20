from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


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


def connect_db(app):
    """
    Connect Flask app to the database.
    """

    app.app_context().push()
    db.app = app
    db.init_app(app)
