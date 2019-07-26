import axios from "axios";

import { createMessage, returnErrors } from "./messages";
import { GET_QUESTS, DELETE_QUEST, ADD_QUEST } from "./types";
import { tokenConfig } from "./AuthenticationActions";

export const getQuests = () => (dispatch, getState) => {
  axios
    .get("/api/quests/", tokenConfig(getState))
    .then(resp => {
      dispatch({
        type: GET_QUESTS,
        payload: resp.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteQuest = id => (dispatch, getState) => {
  axios
    .delete(`/api/quests/${id}`, tokenConfig(getState))
    .then(resp => {
      dispatch(createMessage({ deleteQuest: "Quest deleted" }));
      dispatch({
        type: DELETE_QUEST,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const addQuest = quest => (dispatch, getState) => {
  axios
    .post("/api/quests/", quest, tokenConfig(getState))
    .then(resp => {
      dispatch(createMessage({ addQuest: "Quest added" }));
      dispatch({
        type: ADD_QUEST,
        payload: resp.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
