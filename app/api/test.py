from flask import Blueprint
import models

bp = Blueprint('test', __name__)

@bp.route('user')
def user():
    user = models.User.query.first()
    return user.to_dict()
