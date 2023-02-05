import { useState } from "react";
import { logo } from "../constants";
import { Input } from "../ui/index";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="text-center w-25 mx-auto mt-5">
			<form>
				<img
					className="mb-4"
					src={logo}
					alt="icon"
					width="72"
					height="57"
				/>
				<h1 className="h3 mb-3 fw-normal">Please sign in</h1>

				<Input label={"Username"} state={name} setState={setName} />

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

				<button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
					Sign in
				</button>
			</form>
		</div>
	);
};

export default Register;
