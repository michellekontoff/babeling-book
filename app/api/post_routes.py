from flask import Blueprint, request
from app.forms import PostCreateForm
from app.models import Post, db

bp = Blueprint('posts', __name__)

@bp.route('/new', methods=['POST'])
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
        return form.errors
