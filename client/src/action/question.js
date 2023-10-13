import axios from "axios";
import {
  GET_LEETCODE_QUESTIONS,
  USER_QUESTIONS,
  GET_TODAY_QUESTIONS,
} from "./types";
import { setAlert } from "./alert";
export const getTodayQuestions = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/question/todayQuestions");
    dispatch({ type: GET_TODAY_QUESTIONS, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
export const getLeetcodeQuestion = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/question/leetcode");
    dispatch({ type: GET_LEETCODE_QUESTIONS, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const getUserQuestions = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/question/user");
    dispatch({ type: USER_QUESTIONS, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
export const setReminder =
  (userId, questionId, nextThreeDays, nextSevenDays, nextThirtyDays, type) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const formData = { nextThreeDays, nextSevenDays, nextThirtyDays, type };
    try {
      const res = await axios.post(
        `/api/question/reminder/${userId}/${questionId}`,
        formData,
        config
      );
      dispatch(setAlert(res.data.message, "success"));
    } catch (err) {
      const error = err.response.data;
      if (error) {
        dispatch(setAlert(error.message, "error"));
      }
    }
  };

export const removeReminder = (userId, questionId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/api/question/reminder/${userId}/${questionId}`,
      config
    );
    dispatch(setAlert(res.data.message, "success"));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, "error"));
    }
  }
};
