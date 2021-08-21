import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
	console.log('Initializing Firebase admin');
	admin.initializeApp({ credential: admin.credential.applicationDefault() });
}

export default admin;
