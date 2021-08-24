from .db import db
from sqlalchemy.orm import relationship

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    language_id = db.Column(db.Integer, db.ForeignKey('languages.id'))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    owner = relationship('User', lazy=True)
    language = relationship('Language')

    def to_dict(self):
        return {
            'title': self.title,
            'content': self.content,
            'owner': {
                'id': self.owner.id,
                'username': self.owner.username
            },
            'language': self.language.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
