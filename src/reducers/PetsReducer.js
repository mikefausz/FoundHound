import {
    PETS_FETCH,
    PETS_FETCH_SUCCESS,
    PETS_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    error: '',
    all: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PETS_FETCH:
            return { ...INITIAL_STATE, loading: true };
        case PETS_FETCH_SUCCESS:
            return { ...INITIAL_STATE, all: action.payload };
        case PETS_FETCH_FAIL:
            return { ...INITIAL_STATE, error: action.payload };
        default:
          return state;
    }
};
