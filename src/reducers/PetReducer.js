import {
    PET_FETCH,
    PET_FETCH_SUCCESS,
    PET_FETCH_FAIL,
    PET_CREATE,
    PET_CREATE_SUCCESS,
    PET_CREATE_FAIL,
    PET_UPDATE,
    PET_UPDATE_SUCCESS,
    PET_UPDATE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    error: '',
    selected: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PET_FETCH:
        case PET_CREATE:
        case PET_UPDATE:
            return { ...INITIAL_STATE, loading: true };
        case PET_FETCH_SUCCESS:
        case PET_CREATE_SUCCESS:
        case PET_UPDATE_SUCCESS:
            return { ...INITIAL_STATE, selected: action.payload };
        case PET_FETCH_FAIL:
        case PET_CREATE_FAIL:
        case PET_UPDATE_FAIL:
            return { ...INITIAL_STATE, error: action.payload };
        default:
          return state;
    }
};
