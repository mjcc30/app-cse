import axios from 'axios';

import { fetchUsersAction } from '../../redux/actions';

const url = 'https://localhost:3001/data';

export const fetchUsers = async (dispatch, cb, query) => {
  try {
    const response = await axios.get(url);
    cb && cb();
    dispatch(fetchUsersAction(response.data.results));
  } catch (e) {
    console.log('error requete users!', e);
  }
};
