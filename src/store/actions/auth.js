import { backendApi as axios } from "../../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import * as actionTypes from "./actionTypes";
import * as RootNavigation from "../../Navigation/RootNavigation";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};

export const logoutAction = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const avatarSuccess = (user) => {
  return {
    type: actionTypes.AVATAR_SUCCESS,
    user,
  };
};

export const requestSuccess = () => {
  return {
    type: actionTypes.REQUEST_SUCCESS,
  };
};

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    dispatch(logoutAction());
    RootNavigation.reset("Landing");
  };
};

export const register = (authDetails, user, token) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const response = await axios.post(`/${user}/register`, authDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data;
      if (token) {
        data = { user: response.data.user, token };
      }
      handleAuthResponse(data, dispatch);
      Alert.alert("Account Created Successfully");
    } catch (err) {
      handleError(err, dispatch);
    }
  };
};

export const login = (username, authDetails) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const response = await axios.post(`/${username}/login`, authDetails);
      const { token, user } = response.data;
      handleAuthResponse({ token, user }, dispatch);
    } catch (err) {
      handleError(err, dispatch);
    }
  };
};

export const authCheckState = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString);
      if (!token) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, user));
        handleAuthResponse({ user, token }, dispatch, true);
      }
    } catch (err) {
      handleError(err, dispatch);
    }
  };
};

export const updateAvatar = (formData, token) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const response = await axios.post("/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(avatarSuccess(response.data.user));
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      RootNavigation.reset("HomeTabs", {
        screen: "Home",
      });
    } catch (err) {
      handleError(err, dispatch);
    }
  };
};

const handleError = (err, dispatch) => {
  let errorString;
  if (err.response?.data.error) {
    errorString = err.response?.data.error;
  } else {
    errorString = err.message;
  }
  dispatch(authFail(errorString));
  Alert.alert(errorString);
  dispatch(clearError());
};

const handleAuthResponse = async (data, dispatch, exempt) => {
  if (!exempt) {
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    dispatch(authSuccess(data.token, data.user));
  } else {
    dispatch(clearError());
  }

  if (data.user.role === "Student" && data.user.dateArray.length === 0) {
    RootNavigation.reset("StudentUpdate");
  } else {
    RootNavigation.reset("HomeTabs", {
      screen: "Home",
    });
  }
};

export const updateStudent = (formData, token) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const response = await axios.patch("/student/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(avatarSuccess(response.data.student));
      await AsyncStorage.setItem("user", JSON.stringify(response.data.student));
      RootNavigation.reset("HomeTabs", {
        screen: "Home",
      });
    } catch (err) {
      handleError(err, dispatch);
    }
  };
};

export const submitReport = (formData, token) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const response = await axios.post("/student/message", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.message);
      dispatch(requestSuccess());
      Alert.alert("Report Submit Successfully");
    } catch (err) {
      handleError(err, dispatch);
    }
  };
};
