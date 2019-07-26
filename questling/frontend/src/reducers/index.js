import { combineReducers } from "redux";
import quests from "./quests";
import errors from "./errors";
import messages from "./messages";
import AuthenticationReducer from "./AuthenticationReducer";
import { LOGOUT_SUCCESS } from "../actions/types";

const appReducer = combineReducers({
  quests,
  errors,
  messages,
  authentication: AuthenticationReducer
});

export default (state, action) => {
  if (action.type == LOGOUT_SUCCESS) {
    state = {};
  }

  return appReducer(state, action);
};
