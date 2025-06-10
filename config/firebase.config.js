const Firebase = require('firebase-admin')

const serviceAccount = require('../drive-b5c05-firebase-adminsdk-fbsvc-defbcbf91c.json')

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-222ea.appspot.com'
})