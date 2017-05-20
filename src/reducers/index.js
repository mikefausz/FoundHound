import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PetReducer from './PetReducer';

export default combineReducers({
  user: UserReducer,
  pets: PetReducer,
})
