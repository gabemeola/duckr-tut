import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { Navigation } from "components"
import { container, innerContainer } from "./styles.css"

class MainContainer extends Component {
	render() {
		return(
			<div className={container}>
				<Navigation isAuthed={this.props.isAuthed}/>
				<div className={innerContainer}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

MainContainer.propTypes = {
	isAuthed: PropTypes.bool.isRequired
};

export default connect(
	(state) => ({ isAuthed: state.isAuthed })
)(MainContainer);