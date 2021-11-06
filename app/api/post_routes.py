from flask import Blueprint, request
from sqlalchemy import desc, asc
from app.forms import PostCreateForm, PostEditForm
from app.models import Post, Comment, db
from datetime import datetime


bp = Blueprint('posts', __name__)

# GET ALL POSTS
@bp.route('')
def get_all_posts():
    posts = Post.query.order_by(desc(Post.id)).all()

    return { post.id: post.to_dict() for post in posts }

# GET MOST RECENT POSTS
@bp.route('/latest')
def get_latest_posts():
    posts = Post.query.order_by(desc(Post.id)).limit(30)

    return { 'posts': [post.to_dict() for post in posts] }

# GET, EDIT, DELETE POST BY ID
@bp.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_post_by_id(id):
    post = Post.query.filter(Post.id == id).first()

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
            return form.errors, 500

    elif request.method == 'DELETE':
        db.session.delete(post)
        db.session.commit()
        return { "deletion": "successful" }

# CREATE POST
@bp.route('', methods=['POST'])
def create_post():
    form = PostCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        post = Post(user_id=data['user_id'], title=data['title'], content=data['content'], language_id=data['language_id'], created_at=datetime.now(), updated_at=datetime.now())

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    else:
        return form.errors, 500


#GET ALL OF A POST'S COMMENTS
@bp.route('/<int:id>/comments')
def get_post_comments(id):
    comments = Comment.query.filter(Comment.post_id == id).order_by(asc(Comment.id)).all()


    return { 'comments': [comment.to_dict() for comment in comments] }

#SEARCH FOR POST
# @bp.route('/search/<str:search>')
# def search_posts(search):
#     print(search)
#     posts = Post.query.filter(Post.title.find(search)).first()

#     return posts.to_dict()

@bp.route('/search/<string:search>')
def search_posts(search):
    
    posts_titles = set(Post.query.filter(Post.title.ilike(f'%{search}%')).all())
    posts_content =  set(Post.query.filter(Post.content.ilike(f'%{search}%')).all())

    posts = list(posts_content.union(posts_titles))

    return { 'posts': [post.to_dict() for post in posts] }
