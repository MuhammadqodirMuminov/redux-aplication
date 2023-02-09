import React from "react";

const TextArea = ({ label, state, setState, height = "100px" }) => {
	return (
		<div class="form-floating mt-3">
			<textarea
				class="form-control"
				placeholder={label}
				value={state}
				onChange={(e) => setState(e.target.value)}
				id="floatingTextarea2"
				style={{ height: height }}></textarea>
			<label for="floatingTextarea2">{label}</label>
		</div>
	);
};

export default TextArea;
