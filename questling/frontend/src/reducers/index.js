import { combineReducers } from "redux";
import quests from "./quests";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  quests,
  errors,
  messages
});
