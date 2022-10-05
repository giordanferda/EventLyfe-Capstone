import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./CreateReview.css";
import * as reviewActions from "../../../store/review";

const CreateReview = ({ event, closeModal }) => {
  const id = event.id;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  //   console.log(reviewData);
  // dummy commit for reseeding heroku

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);

    const reviewData = {
      user_id: sessionUser.id,
      stars: stars,
      review: review,
      event_id: id,
    };

    let errors = [];
    if (review.length <= 3) {
      errors.push("Review must be at least 4 characters long");
    }
    setErrors(errors);
    // console.log(errors, "this is errors in create review");
    if (review.length > 3) {
      // const data = await dispatch(reviewActions.createReview(reviewData));
      // if (data && data.errors) {
      //   setErrors(data.errors);
      // } else {
      // }
      dispatch(reviewActions.createReview(reviewData));
      setReview("");
      setStars("");
      closeModal();
    }
  };

  // useEffect(() => {
  // const errors = [];
  // if (review.length < 3) {
  //   errors.push("Review must be at least 3 characters long");
  // }
  // setErrors(errors);
  // }, [review]);
  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-Title">Write Your Review</div>
      <div className="review-one-per-event">
        You are only able to create 1 review per Event.
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
        <input
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          placeholder="Stars"
          type="number"
          min="1"
          max="5"
        />

        <input
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Review"
          type="text"
          required
        />
      </div>
      <button
        className="submitButton-review"
        type="submit"
        // disabled={review.length <= 3}
      >
        Submit Review
      </button>
    </form>
  );
};

export default CreateReview;
