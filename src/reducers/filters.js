const initialState = {
	filtersFetchStatus: "idle",
	filters: [],
	activeFilter: "all",
};

const filtersReducer = (state = initialState, action) => {
	switch (action.type) {
		case "FILTERS_FETCHED":
			return {
				...state,
				filters: action.payload,
				filtersFetchingStatus: "idle",
			};
		case "FILTERS_FETCHING":
			return {
				...state,
				filtersFetchingStatus: "loading",
			};
		case "FILTERS_FETCHING_ERROR":
			return {
				...state,
				filtersFetchingStatus: "error",
			};
		case "FILTER_APPLY":
			return {
				...state,
				activeFilter: action.payload,
			};
		default:
			return state;
	}
};

export default filtersReducer;
