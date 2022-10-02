import { getEventById } from "./event";

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
// get current users review
export const getUserReview = () => async (dispatch) => {
  const res = await fetch(`/api/reviews/current`);
  if (res.ok) {
    const review = await res.json();
    dispatch(getUserReviews(review));
  }
  return res;
};

// create a review
export const createReview = (reviews) => async (dispatch) => {
  const res = await fetch("/api/reviews/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviews),
  });
  if (res.ok) {
    const newReview = await res.json();
    dispatch(create(newReview));
    dispatch(getEventById(reviews.event_id));
    return newReview;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["Bad Data, Please try again."];
  }
  return res;
};

// update a review

export const updateReview = (review, id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(update(updatedReview));
    return updatedReview;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["Bad Data, Please try again."];
  }
  return res;
};

//delete a review
export const deleteReviewById = (id, event_id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteReview(id));
    dispatch(getEventById(event_id));
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["Bad Data, Please try again."];
  }
  return res;
};

//Reducer

export default function reviewReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL:
      action.payload.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case GET_CURRENT:
      action.payload.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case CREATE:
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
