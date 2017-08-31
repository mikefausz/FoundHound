import {
    SCANS_FETCH,
    SCANS_FETCH_SUCCESS,
    SCANS_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    error: '',
    all: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SCANS_FETCH:
            return { ...INITIAL_STATE, loading: true };
        case SCANS_FETCH_SUCCESS:
            return { ...INITIAL_STATE, all: action.payload};
        case SCANS_FETCH_FAIL:
            return { ...INITIAL_STATE, error: action.payload};
        default:
            return state;
    }
};
