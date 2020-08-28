import axios from 'axios';

import {
  fetchArticlesAction,
  fetchSelectedArticleAction,
} from '../../redux/actions';

const ENDPOINT_BASE = 'https://api.conseilce.fr/pac/articles/index.php/7/';

const ENDPOINT_ARTICLES = ENDPOINT_BASE + 'all';

export const fetchArticles = async (dispatch, cb, query) => {
  try {
    const response = await axios(ENDPOINT_ARTICLES);
    cb && cb();
    dispatch(fetchArticlesAction(response.data));
  } catch (e) {
    console.log('error requete articles', e);
  }
};

export const fetchSelectedArticle = async (dispatch, articleId) => {
  const ENPOINT_URL_IMAGE = `"https://preprod-pac.pac-cse.fr/`;
  const SRC = new RegExp(/(")\//g);
  try {
    const response = await axios.get(ENDPOINT_BASE + '1/' + articleId);
    const content = response.data.contenu.replace(SRC, ENPOINT_URL_IMAGE);
    dispatch(fetchSelectedArticleAction(content));
  } catch (e) {
    console.log('error', e);
  }
};
