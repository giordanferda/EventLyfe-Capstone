import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "./EditReview.css";
import * as reviewActions from "../../../store/review";

const EditReview = ({ closeModal, rev }) => {
  //   const id = rev?.event_id;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState(rev?.review);
  const [stars, setStars] = useState(rev?.stars);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      user_id: sessionUser.id,
      stars: stars,
      review,
      event_id: rev?.event_id,
    };
    let errors = [];
    if (review.length <= 3) {
      errors.push("Review must be at least 4 characters long");
    }
    console.log(errors, "this is errors in edit review");

    setErrors(errors);
    if (review.length > 3) {
      dispatch(reviewActions.updateReview(reviewData, rev?.id));
      setReview("");
      setStars("");
      closeModal();
    }
    // const data = await dispatch(
    //   reviewActions.updateReview(reviewData, rev?.id)
    // );
    // if (data && data.errors) {
    //   setErrors(data.errors);
    // } else {
    // }
  };
  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-Edit-Title">Edit Your Review</div>
      <div className="create-event-errors">
        {errors.map((error, i) => (
          <div className="reviewErrors">
            <div key={i} className="reviewError">
              {error}
            </div>
          </div>
        ))}
      </div>
      <div className="star-review-input">
        <input
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          placeholder="Stars"
          type="number"
          min="1"
          max="5"
        />

        <input
          className="make-bigger"
          placeholder="Write a review"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
          required
        />
      </div>
      <button className="submitButton-review" type="submit">
        Submit Review
      </button>
    </form>
  );
};

export default EditReview;
