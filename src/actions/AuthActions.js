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
    CREATE_USER_FAIL
} from './types';


export const getUser = (id) => {
    return(dispatch) => {
        dispatch({ type: GET_USER });

        // User successfully signed in, get profile from db and redirect
        var userRef = firebase.database().ref('users/' + id);
        userRef.once('value')
            .then(function(snapshot) {
                console.log('Got user profile', snapshot.val());
                getUserSuccess(dispatch, snapshot.val());
            })
            .catch((err) => {
                console.log('ERROR', err);
                getUserFail(dispatch, err);
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
                var userRef = firebase.database().ref('users/' + user.uid);
                userRef.once('value')
                    .then(function(snapshot) {
                        console.log('Got user profile', snapshot.val());
                        loginUserSuccess(dispatch, snapshot.val());
                    })
                    .catch((err) => {
                        console.log('ERROR', err);
                        loginUserFail(dispatch, err);
                    });
            })
            .catch(error => {
                console.log(error);
                loginUserFail(dispatch, err);
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

                // Create new user profile
                const newUser = {
                    _id: user.uid,
                    email
                };

                // Store in db and store in Redux state
                const userRef = firebase.database().ref('users/' + user.uid);
                userRef.set(newUser)
                    .then(() => {
                        createUserSuccess(dispatch, newUser);
                        console.log('Added user to db');
                    })
                    .catch((err) => {
                        createUserFail(dispatch, err);
                        console.log('ERROR', err);
                    });
            })
            .catch(error => console.log(error));
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
