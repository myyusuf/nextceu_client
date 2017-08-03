import { createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducers';
import rootEpic from '../epics';
// import thunk from 'redux-thunk';
const epicMiddleware = createEpicMiddleware(rootEpic);

// const store = createStore(rootReducer, compose(applyMiddleware(thunk),
const store = createStore(rootReducer, compose(applyMiddleware(epicMiddleware),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
