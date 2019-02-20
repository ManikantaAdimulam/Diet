import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { listReducer } from "./Reducers/ListReducer";
import { SettingsReducer } from "./Reducers/SettingsReducer";

///
function reducer(state = {}, action) {
  return state;
}

///
const store = () => {
  let rootReducer = combineReducers({ reducer, listReducer, SettingsReducer });
  return createStore(rootReducer, applyMiddleware(thunk));
};

///
export default store;
