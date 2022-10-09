import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./ReviewCard.css";
import { deleteReviewById } from "../../../store/review";
import ShowStars from "../../ShowStars";
import EditReviewModal from "../EditReview/EditReviewModal";
import { useHistory } from "react-router-dom";

function ReviewCard({ review, border }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteReviewById(id, review.event_id));
  };

  return (
    <div
      className="review-card"
      style={{ borderBottom: border ? null : "0.5px solid #e8e8e8" }}
    >
      <div className="review-card-info">
        <div className="review-card-user">{review?.user.username}</div>
        <div>{new Date(review?.created_at).toLocaleDateString()}</div>
      </div>

      <span>
        <i class="fa-solid fa-star"></i> {review?.stars}
      </span>
      <div className="users-review">{review?.review}</div>
      {review?.user_id == sessionUser?.id ? (
        <div className="detail-buttons">
          <EditReviewModal review={review} />
          <button
            className="delete-rev"
            onClick={(e) => handleDelete(e, review?.id)}
          >
            Delete Review
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ReviewCard;
