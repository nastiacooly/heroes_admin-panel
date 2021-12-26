import { createStore, combineReducers, compose } from "redux";
import { heroesReducer, filtersReducer } from "../reducers";

const reducers = { heroes: heroesReducer, filters: filtersReducer };

const enhancer =
	(createStore) =>
	(...args) => {
		const store = createStore(...args);

		const oldDispatch = store.dispatch;
		store.dispatch = (action) => {
			if (typeof action === "string") {
				return oldDispatch({
					type: action,
				});
			}
			return oldDispatch(action);
		};

		return store;
	};

const store = createStore(
	combineReducers(reducers),
	compose(
		enhancer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
