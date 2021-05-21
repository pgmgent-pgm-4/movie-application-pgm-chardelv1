import * as admin from 'firebase-admin';
import 'firebase/auth';
import 'firebase/firestore';

import serviceAccount from './key.json';

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-pgmgent.firebaseio.com"
});

// Reference Authentication
const auth = app.auth();

// Reference Firestore
const db = app.firestore();

/*
 * Generate Timestamps
*/
const generateTimestamps = () => {
  return {
    createdAt: Date.now(),
    modifiedAt: null,
    deletedAt: null,
  }
};

/*
* Generate Integer between min and max
*/
const generateValueBetweenMinAndMax = (min, max) => {
  return min + Math.round(Math.random()*(max - min));
}

export {
  admin,
  app,
  auth,
  db,
  generateTimestamps,
  generateValueBetweenMinAndMax
}