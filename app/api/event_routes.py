from flask import Blueprint, jsonify, request
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

#Create an event (only if logged in)
@event_routes.route('/', methods=['POST'])
@login_required
def create_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_event = Event(
            owner_id=current_user.id,
            name=form.name.data,
            description=form.description.data,
            ticket_quantity=form.ticket_quantity.data,
            address=form.address.data,
            state=form.state.data,
            city=form.city.data,
            zipcode=form.zipcode.data,
            start_time=form.start_time.data,
            close_time=form.close_time.data,
            preview_image=form.preview_image.data
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify(new_event.to_dict()), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Edit an Event

@event_routes.route('/<int:event_id>', methods=['PUT'])
@login_required
def edit_event(event_id):
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event.query.get(event_id)
        if event.owner_id == current_user.id:
            event.name = form.name.data
            event.description = form.description.data
            event.address = form.address.data
            event.state = form.state.data
            event.city = form.city.data
            event.zipcode = form.zipcode.data
            event.start_time = form.start_time.data
            event.close_time = form.close_time.data
            event.preview_image = form.preview_image.data
            db.session.commit()
            return jsonify(event.to_dict()), 200
        else:
            return {'errors': 'You are not authorized to edit this event'}, 401


#DELETE an event

@event_routes.route('/<int:event_id>', methods=['DELETE'])
@login_required
def delete_event(event_id):
    event = Event.query.filter(Event.id == event_id).first()
    if event.owner_id == current_user.id:
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Business successfully deleted", "status-code": 200}), 200
    else:
        return {'errors': 'You are not authorized to delete this event'}, 401
