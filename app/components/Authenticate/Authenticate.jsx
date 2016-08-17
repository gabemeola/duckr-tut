import React, { PropTypes } from "react";

function Authenticate({error, isFetching, onAuth}) {
	return (
		<div>
			<h1>Authenticate</h1>
			<p>Facebook Auth Button</p>
			{error ? <p>{error}</p> : null}
		</div>
	)
}

Authenticate.propTypes = {
	error: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired,
	onAuth: PropTypes.func.isRequired
};

export default Authenticate;