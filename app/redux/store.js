import {createStore, applyMiddleware} from 'redux'
import thunkMiddlewate from 'redux-thunk'
import combineReducers from './reducers'

let store = createStore(combineReducers, applyMiddleware(thunkMiddlewate));
export default store;