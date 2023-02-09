import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleService from "../service/articles";
import {
	getArticleDetailFailore,
	getArticleDetailStart,
	getArticleDetailSuccess,
} from "../slice/article";
import moment from "moment";
import Loader from "../ui/loader";


const ArticleDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { articleDetail,isLoading } = useSelector((state) => state.article);

	const getSingleArticle = async () => {
		dispatch(getArticleDetailStart());

		try {
			const response = await ArticleService.getArticleDetail(id);

			dispatch(getArticleDetailSuccess(response.article));
		} catch (error) {
			dispatch(getArticleDetailFailore());
		}
	};

	useEffect(() => {
		getSingleArticle();
	}, [id]);

    return (
			<div className="p-5 mb-4  rounded-3">
				{isLoading ? (
					<Loader />
				) : (
					<>
						<div className="container-fluid py-5">
							<h1 className="display-5 fw-bold">
								{articleDetail?.title}
							</h1>
							<p className="col-md-8 fs-4">
								{articleDetail?.description}
							</p>
						</div>
						<div class="col-md-6">
							<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
								<div class="col p-4 d-flex flex-column position-static">
									<h3 class="mb-3">
										{articleDetail?.author.username}
									</h3>

									<p class="mb-auto">
										This is a wider card with supporting text below as
										a natural lead-in to additional content.
									</p>
								</div>
								<div class="col-auto d-none d-lg-block">
									<img
										width="200"
										height="200"
										src={articleDetail?.author.username.image}
										alt=""
									/>
								</div>
							</div>
						</div>
						<p>{articleDetail?.body}</p>
						<p className="text-muted">
							{" "}
							<span className="fw-bold">Created At:</span>{" "}
							{moment(articleDetail?.createdAt).format("MMM DD, YYYY")}
						</p>
					</>
				)}
			</div>
		);
};

export default ArticleDetail;
