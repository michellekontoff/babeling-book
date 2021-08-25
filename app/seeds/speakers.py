from app.models import db, Speaker
from random import randint

def seed_speakers():
    for i in range(0,12):
        speaker = Speaker(user_id=randint(1, 9), language_id=randint(1, 35))
        
        db.session.add(speaker)
        
    db.session.commit()

def undo_speakers():
        db.session.execute('TRUNCATE speakers RESTART IDENTITY CASCADE;')
        db.session.commit()
