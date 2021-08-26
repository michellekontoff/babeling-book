from .db import db
from datetime import datetime
from sqlalchemy.orm import relationship


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    owner = relationship('User', lazy=True)

    def to_dict(self):
        return {
            'content': self.content,
            'owner': {
                'id': self.owner.id,
                'username': self.owner.username,
                'speaks': [lang.name for lang in self.owner.speaks]
            },
            'post_id': self.post_id,
            'created_at': self.created_at.strftime("%c"),
            'updated_at': self.updated_at.strftime("%c")
    }
