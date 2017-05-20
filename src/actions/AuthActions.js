import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  LOGIN_USER_SUCCESS
} from './types';

export const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user
  };
}
