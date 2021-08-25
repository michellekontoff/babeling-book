from app.models import db, Learner
from random import randint

def seed_learners():
    for i in range(0,12):
        learner = Learner(user_id=randint(1, 9), language_id=randint(1, 35))
        
        db.session.add(learner)

    db.session.commit()

def undo_learners():
        db.session.execute('TRUNCATE learners RESTART IDENTITY CASCADE;')
        db.session.commit()
