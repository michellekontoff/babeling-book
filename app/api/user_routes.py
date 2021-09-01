from flask import Blueprint, jsonify
from flask_login import login_required
from sqlalchemy import desc
from app.models import User, Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/posts')
def get_posts_by_user(id):
    posts = Post.query.filter(Post.user_id == id).order_by(desc(Post.id)).all()

    return { 'posts': [post.to_dict() for post in posts] }


@user_routes.route('/search/<string:search>')
def search_users(search):
    
    users = User.query.filter(User.username.like(f'%{search}%')).all()

    return { 'users': [user.to_dict() for user in users] }
