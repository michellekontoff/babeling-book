from .db import db

class Follower(db.Model):
    __tablename__ = 'followers'

    id = db.Column(db.Integer, primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False,)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
