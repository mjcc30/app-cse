import { LOGIN_USERS, ADD_ARTICLES, SELECTED_ARTICLE } from "./actionTypes";

// action = {type: NOM_ACTION, payload: data}
export const fetchUsersAction = (data) => ({
  type: LOGIN_USERS,
  payload: {
    data,
  },
});

// action = {type: NOM_ACTION, payload: data}
export const fetchArticlesAction = (data) => ({
  type: ADD_ARTICLES,
  payload: {
    data,
  },
});

export const fetchSelectedArticleAction = (data) => ({
  type: SELECTED_ARTICLE,
  payload: {
    data,
  },
});
