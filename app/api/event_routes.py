from flask import Blueprint, jsonify
from app.models import db, Event
from ..forms.event_form import EventForm
from datetime import time
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

event_routes = Blueprint('events', __name__, url_prefix='/events')

#Get all events
@event_routes.route('/')
def all_events():
    events = Event.query.all()
    return {'events': [event.to_dict() for event in events]}

#Get one event by id
@event_routes.route('/<int:id>')
def one_event(id):
    event = Event.query.get(id)
    return event.to_dict()
