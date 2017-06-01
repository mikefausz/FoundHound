import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PetReducer from './PetReducer';
import ScanReducer from './ScanReducer';

export default combineReducers({
  user: UserReducer,
  pets: PetReducer,
  scans: ScanReducer,
})
