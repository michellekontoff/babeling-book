from app.models import db, Learner

def seed_learners():
    l1 = Learner(user_id=1, language_id=3)

    db.session.add(l1)
    db.session.commit()

def undo_learners():
        db.session.execute('TRUNCATE learners RESTART IDENTITY CASCADE;')
        db.session.commit()
