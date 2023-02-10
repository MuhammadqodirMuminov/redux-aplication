import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleService from "../service/articles";
import {
	getArticleFailure,
	getArticlesSuccess,
	getArticleStart,
} from "../slice/article";
import { Loader } from "../ui/index";
import ArticleCard from "./articleCard";

const Main = () => {
	const { articles, isLoading } = useSelector((state) => state.article);

	const dispatch = useDispatch();

	const getArticles = async () => {
		dispatch(getArticleStart());

		try {
			const responce = await ArticleService.getArticles();

			dispatch(getArticlesSuccess(responce.articles));
		} catch (error) {
			dispatch(getArticleFailure(error));
		}
	};

	useEffect(() => {
		getArticles();
	}, []);

	return (
		<div>
			{isLoading && <Loader />}
			<div className="row">
				{articles.map((item, i) => {
					return (
						<ArticleCard key={i} item={item} getArticles={getArticles} />
					);
				})}
			</div>
		</div>
	);
};

export default Main;
