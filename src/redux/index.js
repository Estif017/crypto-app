import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import coinList from './coinListReducer';

const reducers = combineReducers({
	coinList,
});
export const store = createStore(reducers, applyMiddleware(thunk));
