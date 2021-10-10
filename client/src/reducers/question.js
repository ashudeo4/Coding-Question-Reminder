import {
  GET_LEETCODE_QUESTIONS,
  USER_QUESTIONS,
  GET_TODAY_QUESTIONS,
  CLEAR_QUESTIONS,
} from "../action/types";
const initialState = {
  todayQuestions: [],
  leetcode: [],
  userQuestions: [],
  totalLeetcodeQuestions: null,
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
    case USER_QUESTIONS:
      return {
        ...state,
        userQuestions: payload,
      };

    case GET_TODAY_QUESTIONS:
      return {
        ...state,
        todayQuestions: [...payload.todayQuestions],
      };
    case CLEAR_QUESTIONS:
      return {
        ...state,
        userQuestions: [],
        todayQuestions: [],
        leetcode: [],
      };
    default:
      return state;
  }
}
