from .db import db

class Speaker(db.Model):
    __tablename__ = 'speakers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False,)
    language_id = db.Column(db.Integer, db.ForeignKey('languages.id'), nullable=False)
