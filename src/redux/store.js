import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import reducer from "./reducer";

const middleware = applyMiddleware(promiseMiddleware());

const store = createStore(
  reducer,
  middleware

  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
