from flask import Blueprint, request
from sqlalchemy import desc
from app.forms import PostCreateForm, PostEditForm
from app.models import Post, db
from datetime import datetime


bp = Blueprint('posts', __name__)

# GET ALL POSTS
@bp.route('/')
def get_all_posts():
    posts = Post.query.order_by(desc(Post.created_at)).all()

    return { post.id: post.to_dict() for post in posts }

# GET, EDIT, DELETE POST BY ID
@bp.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_post_by_id(id):
    post = Post.query.filter(Post.id == id).first()
    print('AJSHDKAJHDKJASH', '2', id)
    print(post)
    if post is None:
        return {'error': 'Post could not be found.'}

    if request.method == 'GET':
        return post.to_dict()

    elif request.method == 'PUT':
        form = PostEditForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(post)
            post.updated_at = datetime.now()
            db.session.add(post)
            db.session.commit()
            return post.to_dict()
        else:
            return form.errors

    elif request.method == 'DELETE':
        db.session.delete(post)
        db.session.commit()
        return { "deletion": "successful" }

# CREATE POST
@bp.route('/', methods=['POST'])
def create_post():
    form = PostCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        post = Post(user_id=data['user_id'], title=data['title'], content=data['content'], language_id=data['language_id'])

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    else:
        return form.errors, 500
