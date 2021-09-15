import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import user from "./user";
import question from "./question";
export default combineReducers({
  alert,
  auth,
  user,
  question,
});
