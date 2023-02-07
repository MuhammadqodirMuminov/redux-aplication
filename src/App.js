import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Main, Login, Register, Navbar } from "./components";
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
			<Routes>
				<Route path="/" element={<Main />} />

				<Route path="/login" element={<Login />} />

				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
};

export default App;
