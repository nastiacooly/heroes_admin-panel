export const heroesFetching = () => {
	return {
		type: "HEROES_FETCHING",
	};
};

export const heroesFetched = (heroes) => {
	return {
		type: "HEROES_FETCHED",
		payload: heroes,
	};
};

export const heroesFetchingError = () => {
	return {
		type: "HEROES_FETCHING_ERROR",
	};
};

export const heroCreate = (hero) => {
	return {
		type: "HERO_CREATE",
		payload: hero,
	};
};

export const heroCreatingError = () => {
	return {
		type: "HERO_CREATING_ERROR",
	};
};

export const filtersFetched = (filters) => {
	return {
		type: "FILTERS_FETCHED",
		payload: filters,
	};
};

export const filtersFetching = () => {
	return {
		type: "FILTERS_FETCHING",
	};
};

export const heroDelete = (heroId) => {
	return {
		type: "HERO_DELETE",
		payload: heroId,
	};
};
