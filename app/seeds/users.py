from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    DemoUser = User(
        username='Demo',firstname='Demo', lastname='User', email='demo@aa.io', password='password')
    elon = User(
        username='Elon', firstname='Elon', lastname='Musk', email='elon@aa.io', password='password')
    james = User(
        username='jsmith', firstname='James', lastname='Smith', email='James@aa.io', password='password')
    review = User(
        username='Zac', firstname='Zach', lastname='Rodriguez', email='review@aa.io', password='password')


    db.session.add(DemoUser)
    db.session.add(elon)
    db.session.add(james)
    db.session.add(review)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
