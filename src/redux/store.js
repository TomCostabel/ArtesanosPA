// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import Reducer from "../redux/reducer/index.js";

// const rootReducer = combineReducers({
//     Reducer: Reducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
import { applyMiddleware, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducer/index.js";

const store = createStore(
    rootReducer,

    applyMiddleware(thunk)
);

export default store;
