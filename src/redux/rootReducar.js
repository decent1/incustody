import { combineReducers } from 'redux';
import UserReducar from './User/userReducar';

const rootReducar = combineReducers({
    user:UserReducar
})

export default rootReducar