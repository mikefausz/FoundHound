import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PetReducer from './PetReducer';
import PetsReducer from './PetsReducer';
import ScanReducer from './ScanReducer';
import ScansReducer from './ScansReducer';

export default combineReducers({
    auth: AuthReducer,
    pet: PetReducer,
    pets: PetsReducer,
    scan: ScanReducer,
    scans: ScansReducer,
})
