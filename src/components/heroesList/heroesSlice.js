import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: "idle",
	heroCreatingStatus: "idle",
});

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
	const { request } = useHttp();
	return request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
	name: "heroes",
	initialState,
	reducers: {
		heroCreate: (state, action) => {
			heroesAdapter.addOne(state, action.payload);
			state.heroCreatingStatus = "idle";
		},
		heroCreatingError: (state) => {
			state.heroCreatingStatus = "error";
		},
		heroDelete: (state, action) => {
			heroesAdapter.removeOne(state, action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, (state) => {
				state.heroesLoadingStatus = "loading";
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroesLoadingStatus = "idle";
				heroesAdapter.setAll(state, action.payload);
			})
			.addCase(fetchHeroes.rejected, (state) => {
				state.heroesLoadingStatus = "error";
			})
			.addDefaultCase(() => {});
	},
});

const { actions, reducer: heroesReducer } = heroesSlice;
export default heroesReducer;

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

// Мемоизирует значения стейта и не вызывает перерендер, если указанные части стейта не менялись
export const filteredHeroesSelector = createSelector(
	(state) => state.filters.activeFilter,
	selectAll,
	(activeFilter, heroes) => {
		return activeFilter === "all"
			? heroes
			: heroes.filter(({ element }) => element === activeFilter);
	}
);

export const { heroCreate, heroCreatingError, heroDelete } = actions;
