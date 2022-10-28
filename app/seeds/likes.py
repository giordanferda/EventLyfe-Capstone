# from ..models import db
# from app.models import Like


# def seeded_likes():
#     seeder_likes = [
#         Like(
#             user_id=1, event_id=1, like=True
#         ),
#         Like(
#             user_id=2, event_id=2, like=True
#         ),
#         Like(
#             user_id=3, event_id=3, like=True
#         )
#     ]

#     for like in seeder_likes:
#         db.session.add(like)
#         db.session.commit()

# def undo_like():
#     db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
#     db.session.commit()
