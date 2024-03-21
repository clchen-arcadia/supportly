from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, EmailField
from wtforms.validators import (
    Email,
    Length,
    InputRequired,
)


class UserSignup(FlaskForm):
    """Form to signup new user"""

    email = EmailField(
        "Email",
        validators=[InputRequired()]
    )

    password = StringField(
        "Password",
        validators=[InputRequired(), Length(min=6)]
    )

    is_admin = BooleanField(
        "Is Admin",
        validators=[InputRequired()],
        false_values=(False, 'false', '',)
    )


class UserLogin(FlaskForm):
    """Form to login user"""

    email = StringField('Email', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])


class TicketSubmit(FlaskForm):
    """Form for creating a new ticket"""

    name = StringField(
        "Name",
        validators=[Length(max=120, min=5)],
    )

    email = EmailField(
        "Email",
        validators=[Email(), Length(max=200, min=5)],
    )

    description = StringField(
        "Description",
        validators=[Length(max=1800, min=5)],
    )
