from flask import Blueprint, jsonify, request
from app.models import Ticket, db
from app.forms import TicketForm
from app.api.auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

ticket_routes = Blueprint('tickets', __name__, url_prefix='/tickets')

#Get all tickets

@ticket_routes.route('/')
def all_tickets():
    tickets = Ticket.query.all()
    return {'tickets': [ticket.to_dict() for ticket in tickets]}


#Post a ticket

@ticket_routes.route('/', methods=['POST'])
@login_required
def post_ticket():
    form = TicketForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_ticket = Ticket(
            event_id=form.event_id.data,
            user_id=form.user_id.data,
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            card_number=form.card_number.data,
            csv=form.csv.data,
            zip_code=form.zip_code.data
        )
        db.session.add(new_ticket)
        db.session.commit()
        return jsonify(new_ticket.to_dict()), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    # delete a ticket
@ticket_routes.route('/<int:ticket_id>', methods=['DELETE'])
@login_required
def delete_ticket(ticket_id):
    ticket = Ticket.query.filter(Ticket.id == ticket_id).first()
    if ticket.user_id == current_user.id:
        db.session.delete(ticket)
        db.session.commit()
        return {'message': 'Ticket refunded'}
    else:
        return {'errors': 'You do not have permission to delete this ticket'}, 401
