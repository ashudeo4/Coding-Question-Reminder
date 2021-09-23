import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_QUESTIONS,
} from "../action/types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerGoogle = (googleToken) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ token: googleToken });

  try {
    const res = await axios.post("/api/users/google", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, "error"));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const register = (userInfo) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(userInfo);

  try {
    const res = await axios.post("/api/users/", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, "error"));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loginGoogle = (googleToken) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ token: googleToken });

  try {
    const res = await axios.post("/api/auth/google", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, "error"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const login = (userInfo) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(userInfo);

  try {
    const res = await axios.post("/api/auth/", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, "error"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_QUESTIONS });
};
