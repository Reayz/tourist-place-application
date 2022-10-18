import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import placesReducer from "./redux/reducers/placesReducer";

const store = createStore(placesReducer, applyMiddleware(thunk));

// const store = createStore(
//     placesReducer,
//     compose(
//       applyMiddleware(thunk),
//       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );

export default store;
