import firebase from 'firebase';

import {
    SCANS_FETCH,
    SCANS_FETCH_SUCCESS,
    SCANS_FETCH_FAIL,
    SCAN_FETCH,
    SCAN_FETCH_SUCCESS,
    SCAN_FETCH_FAIL
} from './types';

export const scansFetch = ({ petId }) => {
    return(dispatch) => {
        dispatch({ type: SCANS_FETCH });

        // Get pet's scans from db, update state
        const petScansRef = firebase.database().ref(`scans/${petId}`);

        petScansRef.once('value')
            .then(function(snapshot) {
                console.log('Scans Fetch SUCCESS', snapshot.val());
                scansFetchSuccess(dispatch, snapshot.val());
            })
            .catch((error) => {
                console.log('Scans Fetch ERROR', err);
                scansFetchFail(dispatch, err);
            });
    };
};

const scansFetchSuccess = (dispatch, scans) => {
    dispatch({
        type: SCANS_FETCH_SUCCESS,
        payload: scans
    });
}

const scansFetchFail = (dispatch, err) => {
    dispatch({
        type: SCANS_FETCH_FAIL,
        payload: err
    });
}

export const scanFetch = ({ petId, scanId }) => {
    return(dispatch) => {
        dispatch({ type: SCAN_FETCH });

        // Get pet's scans from db, update state
        const petScanRef = firebase.database().ref(`scans/${petId}/${scanId}`);

        petScanRef.once('value')
            .then(function(snapshot) {
                console.log('Scan Fetch SUCCESS', snapshot.val());
                scanFetchSuccess(dispatch, snapshot.val());
            })
            .catch((err) => {
                console.log('Scan Fetch ERROR', err);
                scanFetchFail(dispatch, err);
            });
    };
};

const scanFetchSuccess = (dispatch, scan) => {
    dispatch({
        type: SCAN_FETCH_SUCCESS,
        payload: scan
    });
}

const scanFetchFail = (dispatch, err) => {
    dispatch({
        type: SCAN_FETCH_FAIL,
        payload: err
    });
}
