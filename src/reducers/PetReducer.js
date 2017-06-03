// import data from './PetList.json';

import {
  PETS_FETCH_SUCCESS,
  PET_SELECT
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PETS_FETCH_SUCCESS:
      console.log(action);
      return { ...state, all: action.payload };
    case PET_SELECT:
      console.log(action);
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};
