import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActionCreators from 'redux/modules/modal';
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
	(dispatch) => bindActionCreators(modalActionCreators, dispatch)
)(Modal); // Passing Props Directly from Container to Modal Component