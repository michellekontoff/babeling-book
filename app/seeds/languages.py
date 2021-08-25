from app.models import db, Language
from .lang_list import lang_list

def seed_languages():
    for lang in lang_list:
        lang_seed = Language(name=lang)
        db.session.add(lang_seed)
    
    db.session.commit()

def undo_languages():
    db.session.execute('TRUNCATE languages RESTART IDENTITY CASCADE;')
    db.session.commit()
