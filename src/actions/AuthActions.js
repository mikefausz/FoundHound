import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from './types';

export const loginUser = ({ email, password }) => {
    return(dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {

                // User successfully signed in, get profile from db and redirect
                var userRef = firebase.database().ref('users/' + user.uid);
                userRef.once('value')
                    .then(function(snapshot) {
                        console.log('Got user profile', snapshot.val());
                        loginUserSuccess(dispatch, snapshot.val());
                    })
                    .catch((err) => {
                        loginUserFail(dispatch, err);
                        console.log('ERROR', err);
                    });
            })
            .catch(error => {
                console.log(error);
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
                                loginUserSuccess(dispatch, newUser);
                                console.log('Added user to db');
                            })
                            .catch((err) => {
                                loginUserFail(dispatch, err);
                                console.log('ERROR', err);
                            });
                    })
                    .catch(error => console.log(error));
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
    type: LOGIN_USER_SUCCESS,
    payload: err
  });
}
