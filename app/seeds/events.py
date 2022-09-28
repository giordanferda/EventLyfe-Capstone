from ..models import db
from app.models import Event
from datetime import time



def seeded_events():
    seeder_events = [
        Event(
            owner_id=1,
            name="Event 1",
            description="This is the first event",
            address="123 Main Street",
            state="CA",
            city="Los Angeles",
            zipcode="90001",
            start_time=time(18, 00),
            end_time=time(23, 00),
            preview_image="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ),
        Event(
            owner_id=2,
            name="Event 2",
            description="This is the second event",
            address="123 Main Street",
            state="CA",
            city="Los Angeles",
            zipcode="90001",
            start_time=time(18, 00),
            end_time=time(23, 00),
            preview_image="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ),
        Event(
            owner_id=3,
            name="Event 3",
            description="This is the third event",
            address="123 Main Street",
            state="CA",
            city="Los Angeles",
            zipcode="90001",
            start_time=time(18, 00),
            end_time=time(23, 00),
            preview_image="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        )
    ]
    for event in seeder_events:
        db.session.add(event)
        db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
