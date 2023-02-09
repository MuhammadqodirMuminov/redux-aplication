import axios from "./api";

const ArticleService = {
	async getArticles() {
		const responce = await axios.get("/articles");
		return responce.data;
	},

	async getArticleDetail(slug) {
		const responce = await axios.get(`/articles/${slug}`);
		return responce.data;
	},
};

export default ArticleService;
