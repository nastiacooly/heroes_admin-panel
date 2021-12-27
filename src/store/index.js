import filtersReducer from "../components/heroesFilters/filtersSlice";
import heroesReducer from "../components/heroesList/heroesSlice";
import { configureStore } from "@reduxjs/toolkit";

const stringMiddleware = () => (next) => (action) => {
	if (typeof action === "string") {
		return next({
			type: action,
		});
	}
	return next(action);
};

const store = configureStore({
	reducer: { heroes: heroesReducer, filters: filtersReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
