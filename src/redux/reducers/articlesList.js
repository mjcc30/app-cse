import { ADD_ARTICLES } from "../actionTypes";

const defaultState = [];

export const articlesList = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ARTICLES:
      // payload : { data: data}
      return action.payload.data;
    default:
      return state;
  }
};
