from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


def connect_db(app):
    """
    Connect Flask app to the database.
    """

    app.app_context().push()
    db.app = app
    db.init_app(app)
