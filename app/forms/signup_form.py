from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length, ValidationError, EqualTo
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def strong_password(form, field):
    password = field.data

    if re.match(r"^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$])[\w\d!@#$]$", password):
        return
    else:
        raise ValidationError('Password must have at least one uppercase, one lower case letter, one number, and one special character.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(max=40, message='Username must be fewer than %(max)d characters'), username_exists])
    email = StringField('email', validators=[DataRequired(), Length(max=255, message='Email must be fewer than %(max)d characters'), Email(message='Please provide a valid email.'), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=20, message='Password must be between %(min)d and %(max)d characters. '), strong_password])
    confirm = StringField('confirm', validators=[DataRequired(), EqualTo('password', message='Passwords do not match.')])
