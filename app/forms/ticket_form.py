from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class TicketForm(FlaskForm):
    event_id = IntegerField('event_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    tickets_purchased = IntegerField('tickets_purchased', validators=[DataRequired()])
    tickets_remaining = IntegerField('tickets_remaining', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    card_number = StringField('card_number', validators=[DataRequired(), Length(min=16, max=16)])
    csv = StringField('csv', validators=[DataRequired(), Length(min=3, max=4)])
    zip_code = StringField('zip_code', validators=[DataRequired(), Length(min=5, max=5)])
