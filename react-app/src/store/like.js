const GET_ALL = "likes/GET_ALL";
const GET_CURRENT = "likes/GET_CURRENT";
const CREATE = "likes/CREATE";
const DELETE = "likes/DELETE";

// Action Creators
const getAllLikes = (likes) => ({
  type: GET_ALL,
  payload: likes,
});

const getCurrentUserLikes = (likes) => ({
  type: GET_CURRENT,
  payload: likes,
});

const createLike = (like) => ({
  type: CREATE,
  payload: like,
});

const deleteLike = (likeId) => ({
  type: DELETE,
  payload: likeId,
});

// Thunks

//Get all likes
export const getAllLikesThunk = () => async (dispatch) => {
  const res = await fetch("/api/likes/");
  if (res.ok) {
    const likes = await res.json();
    dispatch(getAllLikes(likes));
  }
  return res;
};

//Get current user likes
export const getCurrentUserLikesThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${userId}`);
  if (res.ok) {
    const likes = await res.json();
    dispatch(getCurrentUserLikes(likes));
  }
  return res;
};

//Create a like

export const createLikeThunk = (like) => async (dispatch) => {
  const res = await fetch("/api/likes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  });
  if (res.ok) {
    const newLike = await res.json();
    dispatch(createLike(newLike));
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }

  return res;
};

//Delete a like

export const deleteLikeThunk = (likeId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${likeId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteLike(likeId));
  }
  return res;
};

// Reducer

export default function likesReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL:
      action.payload.likes.forEach((like) => {
        newState[like.id] = like;
      });
      return newState;
    case GET_CURRENT:
      action.payload.likes.forEach((like) => {
        newState[like.id] = like;
      });
      return newState;
    case CREATE:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
