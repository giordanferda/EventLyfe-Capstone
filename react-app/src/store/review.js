//Types

const GET_ALL = "reviews/GET_ALL";
const GET_CURRENT = "reviews/GET_CURRENT";
const CREATE = "reviews/CREATE";
const UPDATE = "reviews/UPDATE";
const DELETE = "reviews/DELETE";

//Action Creators
const getAll = (reviews) => ({
  type: GET_ALL,
  payload: reviews,
});

const getUserReviews = (review) => ({
  type: GET_CURRENT,
  payload: review,
});

const create = (review) => ({
  type: CREATE,
  payload: review,
});

const update = (review) => ({
  type: UPDATE,
  payload: review,
});

const deleteReview = (reviewId) => ({
  type: DELETE,
  payload: reviewId,
});

//Thunks

//Get all reviews
export const getReviews = () => async (dispatch) => {
  const res = await fetch("/api/reviews/");
  if (res.ok) {
    const reviews = await res.json();
    dispatch(getAll(reviews));
  }
  return res;
};

export const getUserReview = () => async (dispatch) => {
  const res = await fetch(`/api/reviews/current`);
  if (res.ok) {
    const review = await res.json();
    dispatch(getUserReviews(review));
  }
  return res;
};

export const createReview = (review) => async (dispatch) => {
  const res = await fetch("/api/reviews/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const newReview = await res.json();
    dispatch(create(newReview));
    dispatch(get);
  }
  return res;
};
