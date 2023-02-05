import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logo } from "../constants";
import { loginUserStart } from "../slice/auth";
import { Input } from "../ui/index";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const loginHandler = (e) => {
		e.preventDefault();

		dispatch(loginUserStart());
	};

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
					{isLoading ? "loading..." : "login" }
				</button>
			</form>
		</div>
	);
};

export default Login;
