const admin = require('firebase-admin');

const serviceAccount = require('./firebaseaminkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage(); // Adding storage initialization

module.exports = { db, auth, storage };
