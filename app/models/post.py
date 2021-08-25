from .db import db
from sqlalchemy.orm import relationship
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('languages.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    language = relationship('Language')
    owner = relationship('User', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'owner': {
                'id': self.owner.id,
                'username': self.owner.username
            },
            'language': self.language.name,
            'created_at': self.created_at.strftime("%c"),
            'updated_at': self.updated_at.strftime("%c")
        }
