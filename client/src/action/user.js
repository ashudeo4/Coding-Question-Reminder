import axios from "axios";
import { setAlert } from "./alert";
import { GET_ALL_USER_COUNT, UPDATE_PASSWORD } from "./types";

export const getAllUserCount = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/count");
    console.log({ rest: res.data });
    dispatch({ type: GET_ALL_USER_COUNT, payload: res.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const updatePassword = (passwordInfo) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const formData = { passwordInfo };
  console.log({ formData });
  try {
    const res = await axios.put("/api/users/password", formData, config);
    console.log({ res });
    dispatch(setAlert(res.data.message, "success"));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.message, "error"));
    }
  }
};
