from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class TicketForm(FlaskForm):
    event_id = IntegerField('Event Id', validators=[DataRequired()])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired(),Length(min=1, max=50)] )
    last_name = StringField('last_name', validators=[DataRequired(), Length(min=1, max=50)] )
    card_number = StringField('card_number', validators=[DataRequired(), Length(min=16, max=16)])
    csv = StringField('csv', validators=[DataRequired(), Length(min=3, max=4)])
    zip_code = StringField('zip_code', validators=[DataRequired(), Length(min=5, max=5)])
