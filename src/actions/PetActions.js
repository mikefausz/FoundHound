import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  PET_UPDATE,
  PET_CREATE,
  PET_SELECT,
  PETS_FETCH_SUCCESS
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

export const petsFetchSuccess = (pets) => {
  return {
    type: PETS_FETCH_SUCCESS,
    payload: pets
  }
};
