import {
  SCANS_FETCH_SUCCESS,
  SCAN_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    all: [],
    one: {
      location: {}
    }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCANS_FETCH_SUCCESS:
      return { ...state, all: action.payload};
    case SCAN_FETCH_SUCCESS:
      return { ...state, one: action.payload};
    default:
      return state;
  }
};
