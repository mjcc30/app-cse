import { combineReducers } from "redux";

import { loginUsers } from "./loginUsers";
import { articlesList } from "./articlesList";
import { selectedArticle } from "./selectedArticle";

export default combineReducers({
  articlesList,
  selectedArticle,
});
