const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
	heroCreatingStatus: "idle",
	filtersFetchStatus: "idle",
	filters: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "HEROES_FETCHING":
			return {
				...state,
				heroesLoadingStatus: "loading",
			};
		case "HEROES_FETCHED":
			return {
				...state,
				heroes: action.payload,
				heroesLoadingStatus: "idle",
			};
		case "HEROES_FETCHING_ERROR":
			return {
				...state,
				heroesLoadingStatus: "error",
			};
		case "HERO_CREATE":
			return {
				...state,
				heroCreatingStatus: "idle",
				heroes: [...state.heroes, action.payload],
			};
		case "HERO_СREATING_ERROR":
			return {
				...state,
				heroCreatingStatus: "error",
			};
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
		case "HERO_DELETE":
			const updated_heroes = state.heroes.filter(
				({ id }) => id !== action.payload
			);
			return {
				...state,
				heroes: [...updated_heroes],
			};
		default:
			return state;
	}
};

export default reducer;
