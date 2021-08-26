from app.models import db, Follower
from random import randint

def seed_followers():

    # followers of demo
    for i in range(0,3):
        follower = Follower(follower_id=randint(2, 9), followed_id=1)
        
        db.session.add(follower)

    # who demo is following
    for i in range(0,3):
        followed = Follower(follower_id=1, followed_id=randint(2, 9))
        
        db.session.add(followed)
        
    db.session.commit()

def undo_followers():
        db.session.execute('TRUNCATE followers RESTART IDENTITY CASCADE;')
        db.session.commit()
