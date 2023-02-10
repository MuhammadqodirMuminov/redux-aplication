import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleService from "../service/articles";
import {
	getArticleDetailFailore,
	getArticleDetailStart,
	getArticleDetailSuccess,
} from "../slice/article";
import { Form } from "../ui";

const EditArticle = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [body, setBody] = useState("");
	const dispatch = useDispatch();
	const { id } = useParams();

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

	const formSubmit = () => {};

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
