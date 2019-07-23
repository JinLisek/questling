import axios from "axios";

import { createMessage, returnErrors } from "./messages";

import { GET_QUESTS, DELETE_QUEST, ADD_QUEST } from "./types";

export const getQuests = () => dispatch => {
  axios
    .get("/api/quests/")
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

export const deleteQuest = id => dispatch => {
  axios
    .delete(`/api/quests/${id}`)
    .then(resp => {
      dispatch(createMessage({ deleteQuest: "Quest deleted" }));
      dispatch({
        type: DELETE_QUEST,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const addQuest = quest => dispatch => {
  axios
    .post("/api/quests/", quest)
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
