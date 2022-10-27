from flask import Blueprint, jsonify, request
from app.models import db, Like
from datetime import time
from flask_login import login_required, current_user
from ..forms.like_form import LikeForm
from .auth_routes import validation_errors_to_error_messages

like_routes = Blueprint('likes', __name__)

## Get all likes
@like_routes.route('/')
def get_all_likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}


# Get likes of the current user
@like_routes.route('/current')
@login_required
def get_current():
    likes = Like.query.filter(Like.user_id == current_user.id).all()
    return {'likes': [like.to_dict() for like in likes]}


# Create a like
@like_routes.route('/', methods=['POST'])
@login_required
def create_like():
    form =  LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        like = Like(
                user_id=form.user_id.data,
                event_id=form.event_id.data,
                like=form.like.data
        )
        db.session.add(like)
        db.session.commit()
        return jsonify(like.to_dict()), 200


# Delete a like
@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_like(id):
    delete_like = Like.query.filter(Like.id == id).first()
    if delete_like.user_id == current_user.id:
        db.session.delete(delete_like)
        db.session.commit()
        return jsonify({"message": "Like has been deleted","status-code": 200}), 200
    else:
        return {"errors": "Unauthorized use of like"} , 401
