import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "./CreateReview.css";
import * as reviewActions from "../../../store/review";

const CreateReview = ({ event, closeModal }) => {
  const id = event.id;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState([]);
  console.log(event);

  const reviewData = {
    user_id: sessionUser.id,
    stars: stars / 20,
    review,
    event_id: id,
  };
  //   console.log(reviewData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const data = await dispatch(reviewActions.createReview(reviewData));
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
      <div className="review-Title">Write Your Review</div>
      <div className="star-review-input">
        <input
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          placeholder="Stars"
          type="number"
          min="0"
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
      <button onClick={handleSubmit}>Submit Review</button>
    </form>
  );
};

export default CreateReview;
