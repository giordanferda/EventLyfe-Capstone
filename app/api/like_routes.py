from flask import Blueprint, jsonify, request
from app.models import db, Like
from datetime import time
from flask_login import login_required, current_user
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
# @like_routes.route('/', methods=['POST'])
# @login_required
# def create_like():
