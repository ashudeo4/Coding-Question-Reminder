import {
  GET_LEETCODE_QUESTIONS,
  USER_LEETCODE_QUESTIONS,
} from "../action/types";
const initialState = {
  leetcode: [],
  totalLeetcodeQuestions: null,
  userLeetcodeQuestions: [],
  algoexpert: [],
  custom: [],
  Favorite: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LEETCODE_QUESTIONS:
      return {
        ...state,
        leetcode: payload.questionData,
        totalLeetcodeQuestions: payload.totalQuestion,
      };
    case USER_LEETCODE_QUESTIONS:
      return {
        ...state,
        userLeetcodeQuestions: payload,
      };
    default:
      return state;
  }
}
