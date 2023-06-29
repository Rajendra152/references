import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
// const {
//   forwardToMain,
//   replayActionRenderer,
//   getInitialStateRenderer,
//   createAliasedAction,
// } = require('electron-redux');

// console.log("I MA ISIDE0---------------------")

// const initialState = getInitialStateRenderer();
// console.log(initialState);

const configureStore = () =>{
  const middleware = [thunk];
  return createStore(reducer, applyMiddleware(...middleware));
}

export { configureStore };
