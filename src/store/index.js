import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './userReducer';
import stock from './stockReducer';
import transaction from './transactionReducer';

const reducer = combineReducers({
  user,
  stock,
  transaction
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger))
);

export default store;
export * from './userReducer';
export * from './stockReducer';
export * from './transactionReducer';
