import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

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
    SAVE_USER_FAIL,
    SET_PROFILE_PICTURE,
    SET_FCM_TOKEN,
    SET_FCM_TOKEN_SUCCESS
} from './types';


export const getUser = (id) => {
    return(dispatch) => {
        dispatch({ type: GET_USER });

        // User successfully signed in, get profile from db and redirect
        var userRef = firebase.database().ref('users/' + id);
        userRef.once('value')
            .then(function(snapshot) {
                console.log('Get User SUCCESS', snapshot.val());
                getUserSuccess(dispatch, snapshot.val());
            })
            .catch((err) => {
                console.log('Get User ERROR', err);
                getUserFail(dispatch, err.message);
            });
    };
};

const getUserSuccess = (dispatch, user) => {
    dispatch({
        type: GET_USER_SUCCESS,
        payload: user
    });
}

const getUserFail = (dispatch, err) => {
    dispatch({
        type: GET_USER_FAIL,
        payload: err
    });
}

export const loginUser = ({ email, password }) => {
    return(dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {

                // User successfully signed in, get profile from db and redirect
                AsyncStorage.setItem('user_id', user.uid);
                const userRef = firebase.database().ref(`users/${user._id}`);
                userRef.once('value')
                    .then(function(snapshot) {
                        console.log('Get User SUCCESS', snapshot.val());
                        loginUserSuccess(dispatch, snapshot.val());
                    })
                    .catch((err) => {
                        console.log('Get User ERROR', err);
                        loginUserFail(dispatch, err.message);
                    });
            })
            .catch(err => {
                console.log('Login ERROR', err);
                loginUserFail(dispatch, err.message);
            });
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
}

const loginUserFail = (dispatch, err) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: err
    });
}

export const createUser = ({ email, password }) => {
    return(dispatch) => {
        dispatch({ type: CREATE_USER });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {

                // User successfully created
                console.log('Created user: ' + user.uid + ', adding user profile to db...');
                AsyncStorage.setItem('user_id', user.uid);

                // Create new user profile
                const newUser = {
                    _id: user.uid,
                    email
                };

                // Store in db and store in Redux state
                const userRef = firebase.database().ref(`users/${user._id}`);
                userRef.set(newUser)
                    .then(() => {
                        console.log('Create User SUCCESS');
                        createUserSuccess(dispatch, newUser);
                    })
                    .catch((err) => {
                        console.log('Save User ERROR', err);
                        createUserFail(dispatch, err.message);
                    });
            })
            .catch(err => {
                console.log('Sign Up ERROR', err);
                createUserFail(dispatch, err.message);
            });
    };
};

const createUserSuccess = (dispatch, user) => {
    dispatch({
        type: CREATE_USER_SUCCESS,
        payload: user
    });
}

const createUserFail = (dispatch, err) => {
    dispatch({
        type: CREATE_USER_FAIL,
        payload: err
    });
}

export const saveUser = (user) => {
    return(dispatch) => {
        dispatch({ type: SAVE_USER });

        // User successfully signed in, get profile from db and redirect
        const userRef = firebase.database().ref(`users/${user._id}`);
        userRef.set(user)
            .then(() => {
                console.log('Save User SUCCESS');
                saveUserSuccess(dispatch, user);
            })
            .catch((err) => {
                console.log('Save User ERROR', err);
                saveUserSuccess(dispatch, err);
            });
    };
};

const saveUserSuccess = (dispatch, user) => {
    dispatch({
        type: SAVE_USER_SUCCESS,
        payload: user
    });
}

const saveUserFail = (dispatch, err) => {
    dispatch({
        type: SAVE_USER_FAIL,
        payload: err
    });
}

export const setProfilePicture = (url) => {
    return {
        type: SET_PROFILE_PICTURE,
        payload: url
    };
}

export const setFCMToken = (user, token) => {
    return(dispatch) => {

        // Save device FCM registration id to user object
        const userRef = firebase.database().ref(`users/${user._id}`);
        userRef.child('fcm_registration_id').set(token)
            .then(() => {
                console.log('Set FCM Token SUCCESS');
            })
            .catch((err) => {
                console.log('Set FCM Token ERROR', err);
            });
    }
};

const setFCMTokenSuccess = (dispatch, token) => {
    dispatch({
        type: SAVE_USER_SUCCESS,
        payload: token
    });
}
