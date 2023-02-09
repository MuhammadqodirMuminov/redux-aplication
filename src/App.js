import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Main, Login, Register, Navbar, ArticleDetail, CreateArticle } from "./components";
import { getItem } from "./helpers/persistance-storage";
import AuthService from "./service/auth";
import { signUserSuccess } from "./slice/auth";


const App = () => {
	const dispatch = useDispatch();

	const getUser = async () => {
		const responce = await AuthService.getUSer();

		dispatch(signUserSuccess(responce.user));
	};


	useEffect(() => {
		const token = getItem("token");


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

					<Route path="/create-article" element={<CreateArticle />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
