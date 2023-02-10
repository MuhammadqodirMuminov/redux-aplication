import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleService from "../service/articles";
import {
	getArticleFailure,
	getArticlesSuccess,
	getArticleStart,
} from "../slice/article";
import { Loader } from "../ui/index";

const Main = () => {
	const { articles, isLoading } = useSelector((state) => state.article);
	const { user, loggedIn } = useSelector((state) => state.auth);

	const navigate = useNavigate();
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

	const deleteHandler = async (id) => {
		try {
            await ArticleService.deleteArticle(id);
            
			getArticles();
		} catch (error) {
			console.log(error);
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
						<div className="col-md-4 mt-3" key={i}>
							<div className="card h-100 mb-4 box-shadow">
								<img
									className="card-img-top"
									alt=""
									width={"100%"}
									height={"225px"}
									src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_186309f5c3e%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_186309f5c3e%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.71875%22%20y%3D%22.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
								/>
								<div className="card-body ">
									<p className="card-text fw-bold">{item.title}</p>
									<p className="card-text ">{item.description}</p>
								</div>
								<div className="card-footer d-flex justify-content-between align-items-center">
									<div className="btn-group">
										<button
											onClick={() =>
												navigate(`/article/${item.slug}`)
											}
											type="button"
											className="btn btn-sm btn-outline-success">
											View
										</button>
										{loggedIn &&
											user.username === item.author.username && (
												<>
													<button
														type="button"
														className="btn btn-sm btn-outline-secondary">
														Edit
													</button>
													<button
														onClick={() =>
															deleteHandler(item.slug)
														}
														type="button"
														className="btn btn-sm btn-outline-danger">
														Delete
													</button>
												</>
											)}
									</div>
									<small className="text-muted fw-bold">
										{item.author.username}
									</small>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Main;
