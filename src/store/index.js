import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './userReducer';

const reducer = combineReducers({
  user
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger))
);

export default store;
export * from './userReducer';
