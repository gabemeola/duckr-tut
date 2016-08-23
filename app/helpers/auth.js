export default function auth() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				name: 'Gabe Meola',
				avatar: 'https://avatars1.githubusercontent.com/u/14303404?v=3&s=460',
				uid: 'gabemeola'
			})
		}, 2000)
	})
}

export function checkIfAuthed(store) {
	// Firebase Future Stuff
	return store.getState().isAuthed
}

export function logout() {
	console.log("logged out")
}