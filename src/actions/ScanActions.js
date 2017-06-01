import {
  SCANS_FETCH_SUCCESS
} from './types';

export const scansFetchSuccess = (scans) => {
  return {
    type: SCANS_FETCH_SUCCESS,
    payload: scans
  }
};
