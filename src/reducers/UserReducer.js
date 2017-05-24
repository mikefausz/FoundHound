// import data from './UserProfile.json';

import {
  LOGIN_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
