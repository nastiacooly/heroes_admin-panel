import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
	heroCreatingStatus: "idle",
};

const heroesSlice = createSlice({
	name: "heroes",
	initialState,
	reducers: {
		heroesFetching: (state) => {
			state.heroesLoadingStatus = "loading";
		},
		heroesFetched: (state, action) => {
			state.heroesLoadingStatus = "idle";
			state.heroes = action.payload;
		},
		heroesFetchingError: (state) => {
			state.heroesLoadingStatus = "error";
		},
		heroCreate: (state, action) => {
			state.heroes.push(action.payload);
			state.heroCreatingStatus = "idle";
		},
		heroCreatingError: (state) => {
			state.heroCreatingStatus = "error";
		},
		heroDelete: (state, action) => {
			state.heroes = state.heroes.filter(({ id }) => id !== action.payload);
		},
	},
});

const { actions, reducer: heroesReducer } = heroesSlice;
export default heroesReducer;

export const {
	heroesFetching,
	heroesFetched,
	heroesFetchingError,
	heroCreate,
	heroCreatingError,
	heroDelete,
} = actions;
