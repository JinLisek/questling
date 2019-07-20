import axios from "axios";

import { createMessage } from "./messages";

import { GET_QUESTS, DELETE_QUEST, ADD_QUEST, GET_ERRORS } from "./types";

export const getQuests = () => dispatch => {
  axios
    .get("/api/quests/")
    .then(resp => {
      dispatch({
        type: GET_QUESTS,
        payload: resp.data
      });
    })
    .catch(err => console.log(err));
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
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };

      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};
