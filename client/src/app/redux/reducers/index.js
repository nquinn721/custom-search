import { combineReducers } from 'redux';
import home from './home';
import admin from './admin';

const rootReducer = combineReducers({
	home,
	admin,
});

export default rootReducer;