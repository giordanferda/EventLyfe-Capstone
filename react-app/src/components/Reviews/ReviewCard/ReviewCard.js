import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./ReviewCard.css";
import { deleteReviewById } from "../../../store/review";
import ShowStars from "../../ShowStars";
import EditReviewModal from "../EditReview/EditReviewModal";
import { useHistory } from "react-router-dom";

function ReviewCard({ review }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteReviewById(id, review.event_id));
  };

  return (
    <div className="review-card">
      <div className="review-container"></div>
      <div className="review-card-info">
        <div className="review-card-user">{review?.user.username}</div>
      </div>
      <div className="stars-review">
        <div>
          <ShowStars rating={review?.stars} />
          {new Date(review?.created_at).toLocaleDateString()}
        </div>
        <div className="users-review">{review?.review}</div>
        {review?.user_id == sessionUser?.id ? (
          <>
            <EditReviewModal review={review} />
            <button
              className="delete-rev"
              onClick={(e) => handleDelete(e, review?.id)}
            >
              Delete Review
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReviewCard;
