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

  console.log(rev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      user_id: sessionUser.id,
      stars: stars,
      review,
      event_id: rev?.event_id,
    };

    const data = await dispatch(
      reviewActions.updateReview(reviewData, rev?.id)
    );
    if (data && data.errors) {
      setErrors(data.errors);
    } else {
      setReview("");
      setStars("");
      closeModal();
    }
  };
  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-Edit-Title">Edit Your Review</div>
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
            const textValue = e.target.value;
            if (textValue.length > 255) {
              return;
            }
            setReview(e.target.value);
          }}
          required
        />
      </div>
      <button
        className="submitButton-review"
        type="submit"
        disabled={rev?.length <= 3}
      >
        Submit Review
      </button>
    </form>
  );
};

export default EditReview;
