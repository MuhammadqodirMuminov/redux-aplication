import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Main, Login, Register, Navbar, ArticleDetail } from "./components";
import { getItem } from "./helpers/persistance-storage";
import AuthService from "./service/auth";
import { signUserSuccess } from "./slice/auth";
import ArticleService from "./service/articles";
import {
	getArticleFailure,
	getArticlesSuccess,
	getArticleStart,
} from "./slice/article";

const App = () => {
	const dispatch = useDispatch();

	const getUser = async () => {
		const responce = await AuthService.getUSer();

		dispatch(signUserSuccess(responce.user));
	};

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
		const token = getItem("token");

		getArticles();

		if (token) {
			getUser();
		}
	}, []);

	return (
		<div>
			<Navbar />
			<div className="container">
				<Routes>
					<Route path="/" element={<Main />} />

					<Route path="/login" element={<Login />} />

					<Route path="/register" element={<Register />} />

					<Route path="/article/:id" element={<ArticleDetail />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
