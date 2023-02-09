import React from "react";
import Input from "./input";
import TextArea from "./textArea";

const From = (props) => {
	const {
		title,
		description,
		setTitle,
		setDescription,
		body,
		setBody,
		formSubmit,
	} = props;

	return (
		<form className="w-75 mx-auto" onSubmit={formSubmit}>
			<Input label={"title"} state={title} setState={setTitle} />

			<TextArea
				label={"Description"}
				state={description}
				setState={setDescription}
			/>

			<TextArea
				label={"Body"}
				state={body}
				setState={setBody}
				height={"300px"}
			/>

			<button className="btn btn-primary mt-3 w-100 p-2">create</button>
		</form>
	);
};

export default From;
