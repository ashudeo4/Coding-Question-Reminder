import {
  GET_LEETCODE_QUESTIONS,
  USER_QUESTIONS,
  GET_ALGOEXPERT_QUESTION
} from "../action/types";
const initialState = {
  leetcode: [],
  userQuestions: [],
  totalLeetcodeQuestions: null,
  totalAlgoexpertQuestions: null,
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
    case USER_QUESTIONS:
      return {
        ...state,
        userQuestions: payload,
      };
    case GET_ALGOEXPERT_QUESTION:
      return {
        ...state,
        algoexpert: payload.questionData,
        totalAlgoexpertQuestions: payload.totalQuestion

      }
    default:
      return state;
  }
}
