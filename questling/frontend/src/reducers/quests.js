import { GET_QUESTS, DELETE_QUEST, ADD_QUEST } from "../actions/types.js";

const initialState = {
  quests: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUESTS:
      return {
        ...state,
        quests: action.payload
      };
    case DELETE_QUEST:
      return {
        ...state,
        quests: state.quests.filter(quest => quest.id !== action.payload)
      };
    case ADD_QUEST:
      return {
        ...state,
        quests: [...state.quests, action.payload]
      };
    default:
      return state;
  }
}
