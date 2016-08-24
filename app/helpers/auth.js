import { ref, firebaseAuth } from 'config/constants';

export default function auth() {
	return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
}

export function checkIfAuthed(store) {
	// Firebase Future Stuff
	return store.getState().isAuthed
}

export function logout() {
	console.log("logged out");
	return firebaseAuth().signOut();
}

export function saveUser(user) {
	return ref.child(`users/${user.uid}`)
		.set(user)
		.then(() => user)
}