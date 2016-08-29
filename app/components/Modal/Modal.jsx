import React, { PropTypes } from "react";
import ReactModal from 'react-modal';
import { newDuckTop, pointer, newDuckInputContainer, newDuckInput, submitDuckBtn, darkBtn } from './styles.css'

const modalStyles = {
	content: {
		width: 350,
		margin: '0px auto',
		height: 220,
		borderRadius: 5,
		background: '#EBEBEB',
		padding: '0'
	}
};

function Modal(props) {
	function submitDuck() {
		console.log("Duck: ", props.duckText);
		console.log("user", props.user)
	}

	return (
		<span className={darkBtn} onClick={props.openModal}>
			Duck
			<ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
				<div className={newDuckTop}>
					<span>Compose New Duck</span>
					<span onClick={props.closeModal} className={pointer}>X</span>
				</div>
				<div className={newDuckInputContainer}>
					<textarea
						onChange={(e) => props.updateDuckText(e.target.value)}
						value={props.duckText}
					  maxLength={140}
					  type="text"
					  className={newDuckInput}
					  placeholder="What's on your mind?"
					/>
					<button
						className={submitDuckBtn}
					  disabled={props.isSubmitDisabled}
					  onClick={submitDuck}
					>
						Duck
					</button>
				</div>
			</ReactModal>
		</span>
	)
}

Modal.propTypes = {
	duckText: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	isSubmitDisabled: PropTypes.bool.isRequired,
	openModal: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	updateDuckText: PropTypes.func.isRequired,
	duckFanout: PropTypes.func.isRequired
};

export default Modal;