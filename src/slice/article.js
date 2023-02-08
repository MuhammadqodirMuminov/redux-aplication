import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	articles: [],
	error: null,
};

export const articleSlice = createSlice({
	name: "article",
	initialState,
	reducers: {
		getArticleStart: (state) => {
			state.isLoading = true;
		},

		getArticlesSuccess: (state, action) => {
			state.isLoading = false;
			state.articles = action.payload;
		},

		getArticleFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { getArticleStart, getArticlesSuccess, getArticleFailure } =
	articleSlice.actions;
export default articleSlice.reducer;
