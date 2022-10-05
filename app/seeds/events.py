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
            ticket_quantity=300,
            start_time=time(18, 00),
            end_time=time(23, 00),
            preview_image="https://brooklyneagle.com/wp-content/uploads/2019/06/PARADISE_NYC_0924_003802-2792_ALIVECOVERAGE.jpg",
    ),
        Event(
            owner_id=2,
            name="Event 2",
            description="This is the second event",
            address="123 Main Street",
            state="CA",
            city="Los Angeles",
            zipcode="90001",
            ticket_quantity=300,
            start_time=time(18, 00),
            end_time=time(23, 00),
            preview_image="https://edm.com/.image/t_share/MTc2OTU0ODU5MTM0NzIzNDQw/calder-wilson-for-insomniac-events-5-e1573670725699.jpg",
    ),
        Event(
            owner_id=3,
            name="Event 3",
            description="This is the third event",
            address="123 Main Street",
            state="CA",
            city="Los Angeles",
            zipcode="90001",
            ticket_quantity=300,
            start_time=time(18, 00),
            end_time=time(23, 00),
            preview_image="https://weraveyou.com/wp-content/uploads/2022/07/Tomorrowland-2022-01.jpg",
        )
    ]
    for event in seeder_events:
        db.session.add(event)
        db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
