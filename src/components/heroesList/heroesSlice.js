import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
	heroCreatingStatus: "idle",
};

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
	const { request } = useHttp();
	return request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
	name: "heroes",
	initialState,
	reducers: {
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
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, (state) => {
				state.heroesLoadingStatus = "loading";
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroesLoadingStatus = "idle";
				state.heroes = action.payload;
			})
			.addCase(fetchHeroes.rejected, (state) => {
				state.heroesLoadingStatus = "error";
			})
			.addDefaultCase(() => {});
	},
});

const { actions, reducer: heroesReducer } = heroesSlice;
export default heroesReducer;

export const { heroCreate, heroCreatingError, heroDelete } = actions;
