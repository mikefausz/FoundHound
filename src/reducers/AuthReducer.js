import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    error: '',
    user: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...INITIAL_STATE, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...INITIAL_STATE, error: action.payload };
        default:
            return state;
    }
};
