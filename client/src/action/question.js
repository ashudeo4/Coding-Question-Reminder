import axios from "axios";
import { GET_LEETCODE_QUESTIONS, USER_LEETCODE_QUESTIONS } from "./types";
import { setAlert } from "./alert";

export const getLeetcodeQuestion = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/question/leetcode");
    dispatch({ type: GET_LEETCODE_QUESTIONS, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const userLeetcodeQuestions = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/question/user");
    dispatch({ type: USER_LEETCODE_QUESTIONS, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
export const setReminder = (userId, questionId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
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
