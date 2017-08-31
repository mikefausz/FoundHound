import firebase from 'firebase';

import {
    PETS_FETCH,
    PETS_FETCH_SUCCESS,
    PETS_FETCH_FAIL,
    PET_FETCH,
    PET_FETCH_SUCCESS,
    PET_FETCH_FAIL,
    PET_CREATE,
    PET_CREATE_SUCCESS,
    PET_CREATE_FAIL,
    PET_UPDATE,
    PET_UPDATE_SUCCESS,
    PET_UPDATE_FAIL,
} from './types';

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

export const petFetch = ({ userId, petId }) => {
    return(dispatch) => {
        dispatch({ type: PET_FETCH });

        // Get user's pets from db, update state
        const userPetRef = firebase.database().ref('pets/' + userId + '/' + petId);
        userPetRef.once('value')
            .then(function(snapshot) {
                console.log('Got user pet', snapshot.val());
                petFetchSuccess(dispatch, snapshot.val());
            })
            .catch((err) => {
                console.log('ERROR', err);
                petFetchFail(dispatch, err);
            });
    };
};

const petFetchSuccess = (dispatch, pet) => {
    dispatch({
        type: PET_FETCH_SUCCESS,
        payload: pet
    });
}

const petFetchFail = (dispatch, err) => {
    dispatch({
        type: PET_FETCH_SUCCESS,
        payload: err
    });
}

export const petCreate = ({ userId, petObj }) => {

    return (dispatch) => {
        dispatch({ type: PET_CREATE });

        const userPetsRef = firebase.database().ref(`pets/${userId}`);
        const newPetRef = userPetsRef.push();

        console.log(newPetRef);
        newPetRef.set({ ...petObj, _id: newPetRef.key })
            .then((res) => {
                console.log('Pet Create SUCCESS');
                petCreateSuccess(dispatch, res);
            }).catch((err) => {
                console.log('Pet Create ERROR', err);
                petCreateFail(dispatch, err);
            });
    };
};

const petCreateSuccess = (dispatch, pet) => {
    dispatch({
        type: PET_CREATE_SUCCESS,
        payload: pet
    });
}

const petCreateFail = (dispatch, err) => {
    dispatch({
        type: PET_CREATE_SUCCESS,
        payload: err
    });
}

export const petUpdate = ({ userId, petObj }) => {

    return (dispatch) => {
        dispatch({ type: PET_UPDATE });

        const userPetRef = firebase.database().ref(`pets/${userId}/${petId}`);

        userPetRef.set(petObj)
            .then((res) => {
                console.log('Pet Update SUCCESS', res);
                petUpdateSuccess(dispatch, res)
            }).catch((err) => {
                console.log('Pet Update ERROR', err);
                petUpdateFail(dispatch, err)
            });
    };
};

const petUpdateSuccess = (dispatch, pet) => {
    dispatch({
        type: PET_UPDATE_SUCCESS,
        payload: pet
    });
}

const petUpdateFail = (dispatch, err) => {
    dispatch({
        type: PET_UPDATE_SUCCESS,
        payload: err
    });
}
