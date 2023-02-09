import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	articles: [],
	articleDetail: null,
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

		getArticleDetailStart: (state) => {
			state.isLoading = true;
		},

		getArticleDetailSuccess: (state, action) => {
			state.isLoading = false;
			state.articleDetail = action.payload;
		},

		getArticleDetailFailore: (state) => {
			state.isLoading = false;
		},
	},
});

export const {
	getArticleStart,
	getArticlesSuccess,
	getArticleFailure,
	getArticleDetailStart,
	getArticleDetailFailore,
	getArticleDetailSuccess,
} = articleSlice.actions;
export default articleSlice.reducer;
