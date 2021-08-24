from app.models import db, Language

def seed_languages():
    english = Language(name='English')
    french = Language(name='français')
    spanish = Language(name='español')

    db.session.add(english)
    db.session.add(french)
    db.session.add(spanish)
    
    db.session.commit()

def undo_languages():
    db.session.execute('TRUNCATE languages RESTART IDENTITY CASCADE;')
    db.session.commit()
