<<<<<<< HEAD
import axios from 'axios';
=======
import axios from "axios";
>>>>>>> 3ed93a2d35a4220c8197e51d3a7ecb593e0b987f

import {
  fetchArticlesAction,
  fetchSelectedArticleAction,
<<<<<<< HEAD
} from '../../redux/actions';

const ENDPOINT_BASE = 'https://api.conseilce.fr/pac/articles/index.php/7/';

const ENDPOINT_ARTICLES = ENDPOINT_BASE + 'all';
=======
} from "../../redux/actions";

const ENDPOINT_BASE = "https://api.conseilce.fr/pac/articles/index.php/7/";

const ENDPOINT_ARTICLES = ENDPOINT_BASE + "all";
>>>>>>> 3ed93a2d35a4220c8197e51d3a7ecb593e0b987f

export const fetchArticles = async (dispatch, cb, query) => {
  try {
    const response = await axios(ENDPOINT_ARTICLES);
    cb && cb();
    dispatch(fetchArticlesAction(response.data));
  } catch (e) {
<<<<<<< HEAD
    console.log('error requete articles', e);
=======
    console.log("error requete articles", e);
>>>>>>> 3ed93a2d35a4220c8197e51d3a7ecb593e0b987f
  }
};

export const fetchSelectedArticle = async (dispatch, articleId) => {
<<<<<<< HEAD
  const ENPOINT_URL_IMAGE = `"https://preprod-pac.pac-cse.fr/`;
  const SRC = new RegExp(/(")\//g);
  try {
    const response = await axios.get(ENDPOINT_BASE + '1/' + articleId);
    const content = response.data.contenu.replace(SRC, ENPOINT_URL_IMAGE);
    dispatch(fetchSelectedArticleAction(content));
  } catch (e) {
    console.log('error', e);
=======
  try {
    const response = await axios.get(ENDPOINT_BASE + "1/" + articleId);
    dispatch(fetchSelectedArticleAction(response.data));
  } catch (e) {
    console.log("error", e);
>>>>>>> 3ed93a2d35a4220c8197e51d3a7ecb593e0b987f
  }
};
