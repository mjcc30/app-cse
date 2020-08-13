import { SELECTED_ARTICLE } from "../actionTypes";

const defaultState = [];

export const selectedArticle = (state = defaultState, action) => {
  switch (action.type) {
    case SELECTED_ARTICLE:
      return action.payload.data;
    default:
      return state;
  }
};
