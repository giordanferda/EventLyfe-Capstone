from .db import db

class Ticket(db.Model):
    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    card_number = db.Column(db.String, nullable=False)
    csv = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.String, nullable=False)

    event = db.relationship('Event', back_populates='tickets')
    user = db.relationship('User', back_populates='tickets')

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'user': self.user.to_dict(),
            'user_id': self.user_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'card_number': self.card_number,
            'csv': self.csv,
            'zip_code': self.zip_code
        }
