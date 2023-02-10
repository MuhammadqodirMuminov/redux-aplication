import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArticleService from "../service/articles";
import {
	getArticleDetailFailore,
	getArticleDetailStart,
	getArticleDetailSuccess,
    postArticleFailore,
    postArticleStart,
    postArticleSuccess,
} from "../slice/article";
import { Form } from "../ui";

const EditArticle = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [body, setBody] = useState("");
	const dispatch = useDispatch();
	const { id } = useParams();
	const navigate = useNavigate();

	const getSingleArticle = async () => {
		dispatch(getArticleDetailStart());

		try {
			const response = await ArticleService.getArticleDetail(id);

			setTitle(response.article.title);
			setDescription(response.article.description);
			setBody(response.article.body);

			dispatch(getArticleDetailSuccess(response.article));
		} catch (error) {
			dispatch(getArticleDetailFailore());
		}
	};

	useEffect(() => {
		getSingleArticle();
	}, [id]);

	const formSubmit = async (e) => {
		e.preventDefault();

		const article = { title, description, body };

		dispatch(postArticleStart());
		try {
			await ArticleService.editArticle(id,article);

			dispatch(postArticleSuccess());

			navigate("/");
		} catch (error) {
			dispatch(postArticleFailore());
		}
	};

	const formArticle = {
		title,
		setTitle,
		body,
		setDescription,
		setBody,
		description,
		formSubmit,
	};

	return (
		<div className="d-flex flex-column gap-2">
			<h1 className="text-center">Edit article</h1>
			<Form {...formArticle} />
		</div>
	);
};

export default EditArticle;
