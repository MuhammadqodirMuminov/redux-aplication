import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../constants";
import { removeItem } from "../helpers/persistance-storage";
import { logOutUser } from "../slice/auth";

const Navbar = () => {
	const { user, loggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOuthandler = () => {
        dispatch(logOutUser());
		navigate("/login");
		removeItem("token");
	};

	return (
		<div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-3">
			<Link to={"/"}>
				<img src={logo} width={64} alt="logo" />
			</Link>

			<nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
				{loggedIn ? (
					<div className="d-flex align-items-center">
						<p className="mx-3 mb-0 py-1 text-dark text-decoration-none">
							{user.username}
						</p>
						<Link
							className="me-3 py-2 text-dark text-decoration-none"
							to={"/create-article"}>
							AddPost
						</Link>
						<button
							onClick={logOuthandler}
							className="btn btn-outline-danger">
							Logout
						</button>
					</div>
				) : (
					<>
						<Link
							className="me-3 py-2 text-dark text-decoration-none"
							to={"/login"}>
							Login
						</Link>

						<Link
							className="me-3 py-2 text-dark text-decoration-none"
							to={"/register"}>
							Register
						</Link>
					</>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
