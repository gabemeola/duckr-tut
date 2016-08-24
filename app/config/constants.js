import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyCH1vm1cJumuKa4UfLhQWV1ajdHqhcTNNY",
	authDomain: "duckr-2cf70.firebaseapp.com",
	databaseURL: "https://duckr-2cf70.firebaseio.com",
	storageBucket: "duckr-2cf70.appspot.com",
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;