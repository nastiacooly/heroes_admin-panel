import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
	activeFilter: "all",
});

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		filterApply: (state, action) => {
			state.activeFilter = action.payload;
		},
	},
});

const { actions, reducer: filtersReducer } = filtersSlice;
export default filtersReducer;

export const { filterApply } = actions;
