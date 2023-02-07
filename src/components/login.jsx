import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logo } from "../constants";
import AuthService from "../service/auth";
import { signUserFailore, signUserStart, signUserSuccess } from "../slice/auth";
import { Input } from "../ui/index";
import ValidationError from "./validation-error";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isLoading, loggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loginHandler = async (e) => {
		e.preventDefault();

		const user = { email, password };
		dispatch(signUserStart());

		try {
			const responce = await AuthService.userLogin(user);
			dispatch(signUserSuccess(responce.user));
			navigate("/");
		} catch (error) {
			dispatch(signUserFailore(error.response.data.errors));
		}
	};

	useEffect(() => {
		if (loggedIn) {
			navigate("/");
		}
	}, [loggedIn]);

	return (
		<div className="text-center w-25 mx-auto mt-5">
			<form onSubmit={loginHandler}>
				<img
					className="mb-4"
					src={logo}
					alt="icon"
					width="72"
					height="57"
				/>
				<h1 className="h3 mb-3 fw-normal">Please Login</h1>

				<ValidationError />

				<Input
					label={"Email"}
					type={"email"}
					state={email}
					setState={setEmail}
				/>

				<Input
					label={"Password"}
					type={"password"}
					state={password}
					setState={setPassword}
				/>

				<button
					className="w-100 btn btn-lg btn-primary mt-3"
					disabled={isLoading}
					type="submit">
					{isLoading ? "loading..." : "login"}
				</button>
			</form>
		</div>
	);
};

export default Login;
