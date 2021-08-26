from flask import Blueprint
from app.models import Language, db

bp = Blueprint('languages', __name__)

@bp.route('/')
def get_all_languages():
    langs = Language.query.all()

    return { 'languages': [lang.to_dict() for lang in langs] }
