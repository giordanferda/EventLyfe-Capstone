from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TimeField
from wtforms.validators import DataRequired, ValidationError

def validate_name(form, field):
  if len(field.data) > 50:
    raise ValidationError("Name must be less than 50 characters")
  elif len(field.data) < 5:
    raise ValidationError("Name must be at least 5 characters")

def validate_address(form, field):
  if len(field.data) > 50:
    raise ValidationError("Address must be less than 50 characters")
  elif len(field.data) < 6:
    raise ValidationError("Address must be at least 6 characters")

def validate_city(form, field):
  if len(field.data) > 35:
    raise ValidationError("City must be less than 35 characters")
  elif len(field.data) < 5:
    raise ValidationError("City must be at least 5 characters")

def validate_time(form, field):
  if (field.data.hour) > 24:
    raise ValidationError("Time must be valid")
  elif (field.data.hour) < 0:
    raise ValidationError("Time must be valid")


class EventForm(FlaskForm):
  owner_id = IntegerField("owner_id", validators=[DataRequired()])
  name = StringField('name', validators=[DataRequired(), validate_name])
  description = StringField('description', validators=[DataRequired()])
  ticket_quantity = IntegerField('ticket quantity', validators=[DataRequired()])
  address = StringField('address', validators=[DataRequired(), validate_address])
  state = StringField('state', validators=[DataRequired()])
  city = StringField('city', validators=[DataRequired(), validate_city])
  zipcode = IntegerField('zipcode', validators=[DataRequired()])
  event_starts = StringField('event_starts', validators=[DataRequired()])
  event_ends = StringField('event_ends', validators=[DataRequired()])
  start_time = TimeField('start_time', validators=[DataRequired(), validate_time])
  end_time = TimeField('end_time', validators=[DataRequired(), validate_time])
  preview_image = StringField('preview_image', validators=[DataRequired()])
  submit = SubmitField('Submit')
