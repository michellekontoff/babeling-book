from app.models import db, Post
from datetime import datetime
from faker import Faker
from random import randint

def seed_posts():
    fake_fr = Faker(['fr_FR'])
    fake_sp = Faker(['es_ES'])
    fake_jp = Faker(['ja_JP'])
    fake_en = Faker()

    for s in range (0, 30):
        user = randint(1, 9)
        s = Post(title=fake_sp.sentence()[0:50], content=fake_sp.text(), user_id=user, language_id=4)
        db.session.add(s)

    for e in range (0, 30):
        user = randint(1, 9)
        e = Post(title=fake_en.sentence()[0:50], content=fake_en.text(), user_id=user, language_id=1)
        db.session.add(e)

    for f in range (0, 30):
        user = randint(1, 9)
        f = Post(title=fake_fr.sentence()[0:50], content=fake_fr.text(), user_id=user, language_id=6)
        db.session.add(f)

    for j in range (0, 6):
        user = randint(1, 9)
        j = Post(title=fake_jp.sentence()[0:50], content=fake_jp.text(), user_id=user, language_id=8)
        db.session.add(j)


    db.session.commit()

def undo_posts():
        db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
        db.session.commit()
