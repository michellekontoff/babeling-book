from app.models import db, Speaker

def seed_speakers():
    s1 = Speaker(user_id=1, language_id=1)
    s2 = Speaker(user_id=1, language_id=2)

    db.session.add(s1)
    db.session.add(s2)
    db.session.commit()

def undo_speakers():
        db.session.execute('TRUNCATE speakers RESTART IDENTITY CASCADE;')
        db.session.commit()
