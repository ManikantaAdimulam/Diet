import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { listReducer } from "./Reducers/ListReducer";
function reducer(state = {}, action) {
  return state;
}
const store = () => {
  let rootReducer = combineReducers({ reducer, listReducer });
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default store;
