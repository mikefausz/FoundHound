import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    getLoading: false,
    getError: '',
    loginLoading: false,
    loginError: '',
    signUpLoading: false,
    signUpError: '',
    saveLoading: false,
    saveError: '',
    user: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...INITIAL_STATE, getLoading: true };
        case GET_USER_FAIL:
            return { ...INITIAL_STATE, getError: action.payload };
        case LOGIN_USER:
            return { ...INITIAL_STATE, loginLoading: true };
        case LOGIN_USER_FAIL:
            return { ...INITIAL_STATE, loginError: action.payload };
        case CREATE_USER:
            return { ...INITIAL_STATE, signUpLoading: true };
        case CREATE_USER_FAIL:
            return { ...INITIAL_STATE, signUpError: action.payload };
        case SAVE_USER:
            return { ...state, saveLoading: true };
        case SAVE_USER_FAIL:
            return { ...state, saveLoading: false, saveError: action.payload };
        case GET_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
        case CREATE_USER_SUCCESS:
        case SAVE_USER_SUCCESS:
            return { ...INITIAL_STATE, user: action.payload };
        default:
            return state;
    }
};
