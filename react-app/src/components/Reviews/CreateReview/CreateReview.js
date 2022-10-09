import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./CreateReview.css";
import * as reviewActions from "../../../store/review";
import { errorStyle } from "../../../util/styleUtil";
const CreateReview = ({ event, closeModal }) => {
  const id = event.id;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      user_id: sessionUser.id,
      stars: stars,
      review: review,
      event_id: id,
    };
    // const data = await dispatch(reviewActions.createReview(reviewData));
    // if (data && data.errors) {
    //   setErrors(data.errors);
    // } else {
    // }
    dispatch(reviewActions.createReview(reviewData));
    setReview("");
    setStars("");
    closeModal();
  };

  useEffect(() => {
    const errors = [];
    if (review.length <= 3) {
      errors.push("Review must be at least 4 characters long");
    }
    if (review.length > 255) {
      errors.push("Review must be less than 255 characters");
    }
    setErrors(errors);
  }, [review]);
  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-Title">
        <i class="fa-solid fa-magnifying-glass"></i> Write Your Review
      </h3>
      <p className="review-sentence">
        <i class="fa-thin fa-message-dots"></i>
        Let people know about the Venue/Location/Experience and how the Event
        went.
      </p>
      <div className="review-one-per-event">
        Note: You are only able to create 1 review per Event.
      </div>
      {/* {errors.length > 0 && */}
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
          className="event-first-container-input review-input"
          value={stars}
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
          value={review}
          className="event-first-container-input review-input"
          style={errorStyle(errors, "review")}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Review"
          type="text"
          required
        />
      </div>
      <button
        className="submitButton-review"
        type="submit"
        disabled={errors.length > 0}
      >
        Submit Review
      </button>
    </form>
  );
};

export default CreateReview;
