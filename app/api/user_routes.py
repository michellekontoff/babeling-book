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
    
    users = User.query.filter(User.username.ilike(f'%{search}%')).all()

    return { 'users': [user.to_dict() for user in users] }

'''
            ****Profile CRUD****
    add/edit routes for bio and languages separately
    Need forms:
        Bio: just a textarea input

        languages: speaks & learning are a select field for languageId

        needs userId for both
    
    bio edit is straightforward, just add/replace old bio

    languages:
        to add: validation:
            need to grab list of current languages. if language is already in list, throw error.
            if no error, make new speakers/learners
        can't edit? probably just delete, then re-add

    FRONTEND:
        edit profile -> two forms
        top is edit bio
        then
        language shows rows of languages spoken, with delete option next to it.
        below that, is a row that is the form to add a new language.
        after submission, language is added to listed with delete option and new form for new language is rendered at bottom

'''
