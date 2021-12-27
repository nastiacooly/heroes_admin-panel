import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filtersFetchStatus: "idle",
	filters: [],
	activeFilter: "all",
};

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		filtersFetched: (state, action) => {
			state.filters = action.payload;
			state.filtersFetchingStatus = "idle";
		},
		filtersFetching: (state) => {
			state.filtersFetchingStatus = "loading";
		},
		filtersFetchingError: (state) => {
			state.filtersFetchingStatus = "error";
		},
		filterApply: (state, action) => {
			state.activeFilter = action.payload;
		},
	},
});

const { actions, reducer: filtersReducer } = filtersSlice;
export default filtersReducer;

export const {
	filtersFetched,
	filtersFetching,
	filtersFetchingError,
	filterApply,
} = actions;
