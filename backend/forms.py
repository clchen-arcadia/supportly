from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, EmailField
from wtforms.validators import (
    Email,
    Length,
    InputRequired,
    Optional,
)


class TicketSubmit(FlaskForm):
    """Form for creating a new ticket"""

    client_name = StringField(
        "Name",
        validators=[Length(max=120, min=5)],
    )

    client_email = EmailField(
        "Email",
        validators=[Email(), Length(max=200, min=5)],
    )

    description = StringField(
        "Description",
        validators=[Length(max=1800, min=5)],
    )
