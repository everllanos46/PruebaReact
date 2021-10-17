import {createStore, applyMiddleware, compose}  from 'redux';
import rootReducer from './reducers/index';
import { Middlewares} from  './middlewares';

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(Middlewares)))
}