from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class PostEditForm(FlaskForm):
    title = StringField('title', validators=[Length(max=50, message='Title must be fewer than 50 characters.')])
    content = TextAreaField('content', validators=[DataRequired(message='This field cannot be empty.')])
    language_id = IntegerField('language_id')
    user_id = IntegerField('user_id')
