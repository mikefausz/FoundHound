import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PetReducer from './PetReducer';
import ScanReducer from './ScanReducer';

export default combineReducers({
  auth: AuthReducer,
  pets: PetReducer,
  scans: ScanReducer,
})
