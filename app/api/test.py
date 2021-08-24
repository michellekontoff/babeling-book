from flask import Blueprint
from app import models

bp = Blueprint('test', __name__)

@bp.route('user')
def user():
    user = models.User.query.first()
    return {'posts': user.get_posts() }

@bp.route('posts')
def posts():
    posts = models.Post.query.all()
    return { 'posts': [post.to_dict() for post in posts]}

@bp.route('lang')
def lang():
    langs = models.Language.query.all()
    return { 'langs': [lang.name for lang in langs] }
