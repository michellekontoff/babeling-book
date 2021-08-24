from app.models import db, Post
from datetime import datetime

def seed_posts():
    p1 = Post(title='test', content='test postssssssseeeeddddd', language_id=2, user_id=1, created_at=datetime.now(), updated_at=datetime.now())
    p2 = Post(title='test2', content='ANOTHJER test postssssssseeeeddddd', language_id=1, user_id=2, created_at=datetime.now(), updated_at=datetime.now())

    db.session.add(p1)
    db.session.add(p2)

    db.session.commit()

def undo_posts():
        db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
        db.session.commit()
