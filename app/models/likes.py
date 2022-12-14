# from .db import db

# class Like(db.Model):
#     __tablename__ = 'likes'

#     id = db.Column(db.Integer, primary_key = True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
#     like = db.Column('like', db.Boolean, nullable = False)

#     event = db.relationship('Event', back_populates='likes')
#     user = db.relationship('User', back_populates='likes')

#     __table_args__ = (db.UniqueConstraint("user_id", "event_id", name="user_event_unique"),)


#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'event_id': self.event_id,
#             'like': self.like
#         }
