import json
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


@review_routes.route('/<id>')
def get_one(id):
    review = Review.query.get(id)
    return review.to_dict()


#Get all Reviews for a specific user
@review_routes.route('/current')
@login_required
def get_current():
    reviews = Review.query.filter(Review.user_id == current_user.id).all()
    return { "reviews": [r.to_dict() for r in reviews]}

## Create a review

@review_routes.route('/', methods=['POST'])
@login_required
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
                        event_id=form.event_id.data,
                        user_id=form.user_id.data,
                        stars=form.stars.data,
                        review=form.review.data,
                        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict()), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


##Update a review

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review.query.get(id)
        if review.user_id == current_user.id:
            review.stars = form.stars.data
            review.review = form.review.data
            db.session.commit()
            return jsonify(review.to_dict()), 200
    else:
        return {'error':'Unathorized' }, 401


##Delete a review

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.filter(Review.id == id).first()
    print(review)
    print(current_user.id)
    print(review.user_id)
    if review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return {'message': 'Review deleted'}
    else:
        return {'error':'Unathorized'}, 401
