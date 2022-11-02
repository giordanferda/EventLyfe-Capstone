import { useSelector } from "react-redux";
import "./DisplayReviews.css";

const DisplayEveryReview = () => {
  const reviewState = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewState);

  return (
    <div className="review-container">
      <h2>Put review cards here</h2>
      {reviews.map((review) => {
        return (
          <>
            <div>{review.review}</div>
            <div>{review.stars}</div>
          </>
        );
      })}
    </div>
  );
};

export default DisplayEveryReview;
