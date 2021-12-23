const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
	heroCreatingStatus: "idle",
};

const heroesReducer = (state = initialState, action) => {
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
		case "HERO_DELETE":
			return {
				...state,
				heroes: state.heroes.filter(({ id }) => id !== action.payload),
			};
		default:
			return state;
	}
};

export default heroesReducer;
