# from flask_wtf import FlaskForm
# from wtforms import IntegerField, SubmitField
# from wtforms.validators import DataRequired, ValidationError


# def validate_like(form, field):
#     if field.data < 1:
#         raise ValidationError('Must be a valid like')
#     elif field.data > 2:
#         raise ValidationError('Must be a valid like')

# class LikeForm(FlaskForm):
#     user_id = IntegerField('user_id', validators=[DataRequired()])
#     event_id = IntegerField('event_id', validators=[DataRequired()])
#     like = IntegerField('Like', validators=[DataRequired(), validate_like])
#     submit = SubmitField('Submit')
