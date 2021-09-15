import axios from "axios";
import { GET_ALL_USER_COUNT } from "./types";

export const getAllUserCount = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/count");
    console.log({ rest: res.data });
    dispatch({ type: GET_ALL_USER_COUNT, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};
