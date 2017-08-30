import {
  SCANS_FETCH_SUCCESS,
  SCAN_FETCH_SUCCESS
} from './types';

export const scansFetchSuccess = (scans) => {
  return {
    type: SCANS_FETCH_SUCCESS,
    payload: scans
  }
};

export const scanFetchSuccess = (scan) => {
  return {
    type: SCAN_FETCH_SUCCESS,
    payload: scan
  }
};
