from flask import Blueprint
from app import models

bp = Blueprint('test', __name__)

@bp.route('user')
def user():
    users = models.User.query.all()
    return { 'users': [user.to_dict() for user in users] }

@bp.route('posts')
def posts():
    posts = models.Post.query.all()
    return { 'posts': [post.to_dict() for post in posts]}

@bp.route('comments')
def comments():
    comments = models.Comment.query.all()
    return { 'comments': [comment.to_dict() for comment in comments]}

@bp.route('lang')
def lang():
    langs = models.Language.query.all()
    return { 'langs': [lang.name for lang in langs] }
