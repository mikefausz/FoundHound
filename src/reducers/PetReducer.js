import {
    PET_FETCH,
    PET_FETCH_SUCCESS,
    PET_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    error: '',
    selected: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PET_FETCH:
            return { ...INITIAL_STATE, loading: true };
        case PET_FETCH_SUCCESS:
            return { ...INITIAL_STATE, selected: action.payload };
        case PET_FETCH_FAIL:
            return { ...INITIAL_STATE, error: action.payload };
        default:
          return state;
    }
};
