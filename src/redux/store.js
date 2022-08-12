import { createStore } from 'redux';
import rootReducer from './rootReducar';

const store = createStore(rootReducer);

export default store