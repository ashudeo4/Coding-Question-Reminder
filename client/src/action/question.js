import axios from "axios";
import { GET_LEETCODE_QUESTIONS } from "./types";
import { setAlert } from "./alert";

export const getLeetcodeQuestion = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/question/leetcode");
    dispatch({ type: GET_LEETCODE_QUESTIONS, payload: res.data });
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
    console.log(res.data);
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, "error"));
    }
  }
};

export const removeReminder = () => async (dispatch) => {
  try {
    dispatch(setAlert("Reminder removed", "success"));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, "error"));
    }
  }
};
