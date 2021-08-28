from flask import Blueprint, request
from sqlalchemy import desc
from app.forms import CommentCreateForm, CommentEditForm
from app.models import Comment, db
from datetime import datetime


bp = Blueprint('comments', __name__)

# GET ALL COMMENTS
@bp.route('/')
def get_all_comments():
    comments = Comment.query.order_by(desc(Comment.created_at)).all()

    return { comment.id: comment.to_dict() for comment in comments }

# GET, EDIT, DELETE COMMENT BY ID
@bp.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_comment_by_id(id):
    comment = Comment.query.filter(Comment.id == id).first()

    if comment is None:
        return {'error': 'Comment could not be found.'}

    if request.method == 'GET':
        return comment.to_dict()

    elif request.method == 'PUT':
        form = CommentEditForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(comment)
            comment.updated_at = datetime.now()
            db.session.add(comment)
            db.session.commit()
            return comment.to_dict()
        else:
            return form.errors, 500

    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return { "deletion": "successful" }

# CREATE COMMENT
@bp.route('/', methods=['POST'])
def create_comment():
    form = CommentCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        comment = Comment(user_id=data['user_id'], title=data['title'], content=data['content'], language_id=data['language_id'])

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:
        return form.errors, 500
