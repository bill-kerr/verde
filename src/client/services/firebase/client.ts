import type { User } from '$lib/types/user';
import firebase from 'firebase/app';
import 'firebase/auth';
import defaultUserImage from '/images/default-user.png';

const firebaseConfig = {
	apiKey: 'AIzaSyBXJDPXnqglNtueataSNFOvMMrTDUoihcI',
	authDomain: 'cash-flow-c4bb3.firebaseapp.com',
	projectId: 'cash-flow-c4bb3',
	storageBucket: 'cash-flow-c4bb3.appspot.com',
	messagingSenderId: '457353180097',
	appId: '1:457353180097:web:0d45054f6cd60b1b5a3540',
};

export const initializeFirebase = (): firebase.app.App => {
	try {
		return firebase.app();
	} catch {
		return firebase.initializeApp(firebaseConfig);
	}
};

export const loginWithGoogle = async (): Promise<void> => {
	try {
		const provider = new firebase.auth.GoogleAuthProvider();
		await firebase.auth().signInWithPopup(provider);
	} catch (error) {
		return;
	}
};

export const subscribeToAuthState = (onAuthStateChanged: (user: User | null) => void): firebase.Unsubscribe => {
	const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
		const token = await getIdToken(user);
		onAuthStateChanged(mapFirebaseUser(user, token));
	});
	return unsubscribe;
};

const getIdToken = async (user: firebase.User | null): Promise<string> => {
	return user ? user.getIdToken() : '';
};

const mapFirebaseUser = (firebaseUser: firebase.User | null, accessToken: string): User | null => {
	if (!firebaseUser) {
		return null;
	}
	return {
		id: firebaseUser.uid,
		email: firebaseUser.email || '',
		emailVerified: firebaseUser.emailVerified,
		photoUrl: firebaseUser.photoURL || defaultUserImage,
		refreshToken: firebaseUser.refreshToken,
		displayName: firebaseUser.displayName || firebaseUser.email || '',
		accessToken,
	};
};

export const logout = () => firebase.auth().signOut();
