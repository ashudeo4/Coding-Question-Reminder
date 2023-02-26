/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_USER_COUNT } from "../action/types";
const initialState = {
  allUserCount: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USER_COUNT:
      return {
        ...state,
        allUserCount: payload.userCount,
      };
    default:
      return state;
  }
}
