from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length



class CommentCreateForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired(message='This field cannot be empty.'), Length(max=2000, message='Comments must be fewer than %(max)d characters')])
    post_id = IntegerField('post_id')
    user_id = IntegerField('user_id')
