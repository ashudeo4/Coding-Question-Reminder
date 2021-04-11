import axios from "axios";
import { GET_LEETCODE_QUESTIONS } from "./types";

export const getLeetcodeQuestion = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/question/leetcode");
    dispatch({ type: GET_LEETCODE_QUESTIONS, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
