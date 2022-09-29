from sqlalchemy import func
from .db import db

class Event(db.Model):
  __tablename__ = "events"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  ticket_quantity = db.Column(db.Integer, nullable=False)
  address = db.Column(db.String, nullable=False)
  state = db.Column(db.String, nullable=False)
  city = db.Column(db.String, nullable=False)
  zipcode = db.Column(db.Integer, nullable=False)
  start_time = db.Column(db.Time, nullable=False)
  end_time = db.Column(db.Time, nullable=False)
  preview_image = db.Column(db.String, nullable=False)

  created_at = db.Column("created_at", db.DateTime, default=func.now())
  updated_at = db.Column("updated_at", db.DateTime, default=func.now(), onupdate=func.now())
  owner_id = db.Column("owner_id", db.Integer, db.ForeignKey("users.id"))

  event_owner = db.relationship("User")
  # ticket_quantity = db.relationship(back_populates="event")
  reviews = db.relationship("Review", back_populates="event", cascade="all, delete")
  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "description": self.description,
      "ticket_quantity": self.ticket_quantity,
      "address": self.address,
      "state": self.state,
      "city": self.city,
      "zipcode": self.zipcode,
      "start_time": self.start_time.isoformat(timespec='minutes'),
      "end_time": self.end_time.isoformat(timespec='minutes'),
      "preview_image": self.preview_image,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
      "review_ids": [review.id for review in self.reviews],
      "avg_rating": (sum([review.stars for review in self.reviews]) / len(self.reviews)) if len(self.reviews) > 0 else 0,
      "event_owner": self.event_owner.to_dict()
    }
