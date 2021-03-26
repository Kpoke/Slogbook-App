import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  user: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return { ...state, error: null, loading: true };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    user: action.user,
    error: null,
    loading: false,
  };
};

const authFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
};

const clearError = (state, action) => {
  return { ...state, error: null, loading: false };
};

const authLogout = (state, action) => {
  return { ...state, token: null, user: null };
};

const avatarSuccess = (state, action) => {
  return { ...state, user: action.user, loading: false, error: null };
};

const requestSuccess = (state, action) => {
  return { ...state, loading: false, error: null };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.CLEAR_ERROR:
      return clearError(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AVATAR_SUCCESS:
      return avatarSuccess(state, action);
    case actionTypes.REQUEST_SUCCESS:
      return requestSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
