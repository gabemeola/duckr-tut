import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActionCreators from 'redux/modules/modal';
import * as ducksActionCreators from 'redux/modules/ducks';
import { Modal } from 'components';

const mapStateToProps = ({modal, users}) => {
	const duckTextLength = modal.duckText.length;
	return {
		user: users[users.authedId] ? users[users.authedId].info : {},
		duckText: modal.duckText,
		isOpen: modal.isOpen,
		isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140
	}
};

export default connect(
	mapStateToProps,
	(dispatch) => bindActionCreators({...modalActionCreators, ...ducksActionCreators}, dispatch) // Using Spread operator to combine Action creators into a single object to pass to props
)(Modal); // Passing Props Directly from Container to Modal Component