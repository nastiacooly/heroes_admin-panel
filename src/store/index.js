import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { heroesReducer, filtersReducer } from "../reducers";

const reducers = { heroes: heroesReducer, filters: filtersReducer };

const stringMiddleware = () => (next) => (action) => {
	if (typeof action === "string") {
		return next({
			type: action,
		});
	}
	return next(action);
};

const store = createStore(
	combineReducers(reducers),
	compose(
		applyMiddleware(ReduxThunk, stringMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
