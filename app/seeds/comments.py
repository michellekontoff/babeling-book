from app.models import db, Comment
from faker import Faker
from random import randint

def seed_comments():
    fake = Faker(['fr_Fr', 'es_ES', 'en_US', 'ja_JP'])

    for i in range(0, 51):
        uid = randint(1, 9)
        pid = randint(1, 96)
        comment = Comment(content=fake.text(), user_id=uid, post_id=pid)
        
        db.session.add(comment)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
