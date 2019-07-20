import axios from "axios";

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
    .catch(err => console.log(err));
};

export const deleteQuest = id => dispatch => {
  axios
    .delete(`/api/quests/${id}`)
    .then(resp => {
      dispatch({
        type: DELETE_QUEST,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const addQuest = (quest) => dispatch => {
  axios
    .post("/api/quests/", quest)
    .then(resp => {
      dispatch({
        type: ADD_QUEST,
        payload: resp.data
      });
    })
    .catch(err => console.log(err));
};