from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length



class CommentEditForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired(message='This field cannot be empty.'), Length(max=2000, message='Comments must be fewer than %(max)d characters')])
