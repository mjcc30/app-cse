import axios from "axios";

import {
  fetchArticlesAction,
  fetchSelectedArticleAction,
} from "../../redux/actions";

const ENDPOINT_BASE = "https://api.conseilce.fr/pac/articles/index.php/7/";

const ENDPOINT_ARTICLES = ENDPOINT_BASE + "all";

export const fetchArticles = async (dispatch, cb, query) => {
  try {
    const response = await axios(ENDPOINT_ARTICLES);
    cb && cb();
    dispatch(fetchArticlesAction(response.data));
  } catch (e) {
    console.log("error requete articles", e);
  }
};

export const fetchSelectedArticle = async (dispatch, articleId) => {
  try {
    const response = await axios.get(ENDPOINT_BASE + "1/" + articleId);
    dispatch(fetchSelectedArticleAction(response.data));
  } catch (e) {
    console.log("error", e);
  }
};
