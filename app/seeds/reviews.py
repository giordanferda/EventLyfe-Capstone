from app.models import db, Review

def seeded_reviews():
  demo_reviews = [
    Review(
      event_id=1, user_id=1, stars=5, review="This event is amazing!"
    ),
    Review(
      event_id=2, user_id=2, stars=2, review="This event is alright!"
    ),
    Review(
      event_id=3, user_id=3, stars=1, review="This event is whatever!"
    )
  ]

  for review in demo_reviews:
    db.session.add(review)
  db.session.commit()

def undo_reviews():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()
