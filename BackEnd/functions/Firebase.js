
///Link to our DB = https://safeamigos-66c18-default-rtdb.europe-west1.firebasedatabase.app/users.json?
const functions = require("firebase-functions"); ///Make sure Firebase functions can be called

//Handling the DB
var admin = require("firebase-admin");
admin.initializeApp(); ///Required to initialize before any functions are called

var db = admin.database();
//users/user1/full_name
//References the database key to use
var ref = db.ref("users/");

//Vars to hold data about the person to call
var personsName = "";
var personsPhoneNumber = "";


///When this link is opened, call this function. 
exports.personValue = functions.https.onRequest((request, response) => {
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        // console.log(snapshot.val());
        response.send(GetPersonToCall(snapshot.val()));
    }, function(errorObject) { ///Else if there was an error getting the data
        console.log("The read failed: " + errorObject.code);
    });
});



////Get a random persons details that should get the text Message
function GetPersonToCall(dbValue) {

    i = Math.floor((Math.random() * Object.keys(dbValue).length));

    ///This returns the values from the ith key
    //console.log(dbValue[Object.keys(dbValue)[i]]);
    personsName = dbValue[Object.keys(dbValue)[i]].full_name;
    personsPhoneNumber = dbValue[Object.keys(dbValue)[i]].phone_number;

    return personsName + " " + personsPhoneNumber;
}
