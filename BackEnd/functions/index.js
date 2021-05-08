const functions = require("firebase-functions"); ///Make sure Firebase functions can be called
const FirebaseTools = require("./Firebase");
const OverLoadTools = require("./OverloadProcess");

//For exporting to firebase cloud
exports.EmergencyContact = FirebaseTools.emergencyContact;
exports.AddNewUser = OverLoadTools.AddNewUser;
exports.ContactDecline = OverLoadTools.contactDeclined;
