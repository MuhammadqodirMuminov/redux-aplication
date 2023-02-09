import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleService from "../service/articles";
import {
	postArticleFailore,
	postArticleStart,
	postArticleSuccess,
} from "../slice/article";
import { Form } from "../ui";

const CreateArticle = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [body, setBody] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formSubmit = async (e) => {
		e.preventDefault();

		const article = { title, description, body };

		dispatch(postArticleStart());
		try {
			await ArticleService.postArticle(article);

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
			<h1 className="text-center">Create article</h1>
			<Form {...formArticle} />
		</div>
	);
};

export default CreateArticle;
