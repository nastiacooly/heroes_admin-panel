import { createStore, combineReducers } from "redux";
import { heroesReducer, filtersReducer } from "../reducers";

const reducers = { heroes: heroesReducer, filters: filtersReducer };

const store = createStore(
	combineReducers(reducers),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
