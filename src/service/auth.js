import axios from "./api";

const AuthService = {
	async userRegister(user) {
		const responce = await axios.post("/users", { user });

		return responce.data;
	},

	async userLogin(user) {
		const responce = await axios.post("/users/login", { user });

		return responce.data;
	},

	async getUSer() {
		const responce = await axios.get("/user");
		return responce.data;
    },
};

export default AuthService;
