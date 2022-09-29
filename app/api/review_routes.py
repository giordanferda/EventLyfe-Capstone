from flask import Blueprint, jsonify, request
from app.models import db, Review
from ..forms.review_form import ReviewForm
from datetime import time
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages


review_routes = Blueprint('reviews', __name__, url_prefix='/reviews')


#Get all Reviews
@review_routes.route('/')
def get_all():
    reviews = Review.query.all()
    return { "reviews": [r.to_dict() for r in reviews] }
