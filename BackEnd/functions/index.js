const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//Handling the DB

var admin = require("firebase-admin");
admin.initializeApp();
var dbLink = "https://safeamigos-66c18-default-rtdb.europe-west1.firebasedatabase.app/";

var db = admin.database();
var ref = db.ref(dbLink);



exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});


// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });