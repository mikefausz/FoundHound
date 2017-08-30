import firebase from 'firebase';

import {
    PET_UPDATE,
    PET_CREATE,
    PET_SELECT,
    PET_FETCH,
    PET_FETCH_SUCCESS,
    PET_FETCH_FAIL,
    PETS_FETCH,
    PETS_FETCH_SUCCESS,
    PETS_FETCH_FAIL
} from './types';

export const petUpdate = ({ prop, value }) => {
    return {
        type: PET_UPDATE,
        payload: { prop, value }
    }
};

export const petSelect = (pet) => {
    return {
        type: PET_SELECT,
        payload: pet
    }
};

export const petCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/pets/${currentUser.uid}`)
            .push({ name, phone, shift })
            .then(() => {
                dispatch({ type: PET_CREATE });
                Actions.pet_list({ type: 'reset'  });
            });
    };
};

export const petsFetch = ({ userId }) => {
    return(dispatch) => {
        dispatch({ type: PETS_FETCH });

        // Get user's pets from db, update state
        const userPetsRef = firebase.database().ref('pets/' + userId);
        userPetsRef.once('value')
            .then(function(snapshot) {
                console.log('Got user pets', snapshot.val());
                petsFetchSuccess(dispatch, snapshot.val());
            })
            .catch((err) => {
                console.log('ERROR', err);
                petsFetchFail(dispatch, err);
            });
    };
};

const petsFetchSuccess = (dispatch, pets) => {
    dispatch({
        type: PETS_FETCH_SUCCESS,
        payload: pets
    });
}

const petsFetchFail = (dispatch, err) => {
    dispatch({
        type: PETS_FETCH_SUCCESS,
        payload: err
    });
}
