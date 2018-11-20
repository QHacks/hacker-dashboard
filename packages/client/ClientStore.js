import { createStore, combineReducers, compose } from "redux";
import { reducer as formReducer } from "redux-form";

const FORM_MOUNT = "form";

const IS_PROD = process.env.NODE_ENV === "production";

function getStore(opt) {
  const store = createStore(
    combineReducers({
      [FORM_MOUNT]: formReducer
    }),
    compose(
      !IS_PROD && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  return store;
}

export default getStore();
