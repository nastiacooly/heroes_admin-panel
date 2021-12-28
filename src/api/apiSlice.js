import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
	tagTypes: ["Heroes"],
	endpoints: (builder) => ({
		getHeroes: builder.query({
			query: () => "/heroes",
			providesTags: ["Heroes"],
		}),
		createHero: builder.mutation({
			query: (hero) => ({
				url: "/heroes",
				method: "POST",
				body: hero,
			}),
			// When mutation made, api will fetch updated heroes list (getHeroes endpoint which is connected to this tag)
			invalidatesTags: ["Heroes"],
		}),
		deleteHero: builder.mutation({
			query: (id) => ({
				url: `/heroes/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Heroes"],
		}),
		getFilters: builder.query({
			query: () => "/filters",
		}),
	}),
});

export const {
	useGetHeroesQuery,
	useCreateHeroMutation,
	useDeleteHeroMutation,
	useGetFiltersQuery,
} = apiSlice;
