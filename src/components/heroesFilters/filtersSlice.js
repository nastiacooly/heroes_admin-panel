import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
	filtersFetchStatus: "idle",
	filters: [],
	activeFilter: "all",
};

export const fetchFilters = createAsyncThunk("filters/fetchFilters", () => {
	const { request } = useHttp();
	return request("http://localhost:3001/filters");
});

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		filterApply: (state, action) => {
			state.activeFilter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilters.pending, (state) => {
				state.filtersFetchingStatus = "loading";
			})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filters = action.payload;
				state.filtersFetchingStatus = "idle";
			})
			.addCase(fetchFilters.rejected, (state) => {
				state.filtersFetchingStatus = "error";
			});
	},
});

const { actions, reducer: filtersReducer } = filtersSlice;
export default filtersReducer;

export const { filterApply } = actions;
