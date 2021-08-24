from .db import db

class Learner(db.Model):
    __tablename__ = 'learners'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False,)
    language_id = db.Column(db.Integer, db.ForeignKey('languages.id'), nullable=False)
