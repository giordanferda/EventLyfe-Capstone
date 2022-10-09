import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./EditReview.css";
import * as reviewActions from "../../../store/review";
import { errorStyle } from "../../../util/styleUtil";
const EditReview = ({ closeModal, rev }) => {
  //   const id = rev?.event_id;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState(rev?.review);
  const [stars, setStars] = useState(JSON.stringify(rev?.stars));
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

  useEffect(() => {
    const errors = [];
    if (review.length <= 3) {
      errors.push("Review must be at least 4 characters long");
    }
    if (review.length > 255) {
      errors.push("Review must be less than 255 characters");
    }
    const parsedStars = parseInt(stars);
    if (parsedStars < 1 || parsedStars > 5) {
      errors.push("Stars must be between 1 and 5");
    }
    setErrors(errors);
  }, [review, stars]);

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-Title">
        <i class="fa-solid fa-magnifying-glass"></i> Edit Your Review
      </h3>
      <p className="review-sentence">
        <i class="fa-thin fa-message-dots"></i>
        Let people know about the Venue/Location/Experience and how the Event
        went.
      </p>
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
        <label className="star-label">
          <i class="fa-regular fa-star"></i> Stars
        </label>
        <input
          value={stars}
          className="event-first-container-input"
          style={errorStyle(errors, "stars")}
          onChange={(e) => setStars(e.target.value)}
          placeholder="Stars"
          type="number"
          min="1"
          max="5"
        />
        <label className="review-label">
          <i class="fa-regular fa-comments"></i> Review
        </label>
        <input
          className="make-bigger event-first-container-input"
          placeholder="Write a review"
          value={review}
          style={errorStyle(errors, "review")}
          onChange={(e) => {
            setReview(e.target.value);
          }}
          required
        />
      </div>
      <button
        disabled={errors.length > 0}
        className="submitButton-review edit-review-button"
        type="submit"
      >
        Submit Review
      </button>
    </form>
  );
};

export default EditReview;
