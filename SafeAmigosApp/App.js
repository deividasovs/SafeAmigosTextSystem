/**
 * @authors Deividas Ovsianikovas, <your names here>, , , , ,
 * @format
 * @flow strict-local
 */
require("firebase/functions");


import React, { useState, useEffect } from 'react';
///import libs
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  AppRegistry,
  TextInput
} from 'react-native';

//import {createStackNavigator} from "@react-navigatioon/stack"
import * as firebase from 'firebase';
import * as Location from 'expo-location';
//import functions from '@react-native-firebase/functions';

AppRegistry.registerComponent('main', () => App);


var usersName = "Peter";
var usersPhoneNumber = "0862242312";
var userLocation = "";
var contactsName = "Homer";
var contactsNumber = "0623214213";


var isUserPage = true;


////------------------Firebase Functionality--------------------

///Firebase android configuration tokens
const androidConfig = {
  clientId: '110138948795-ug5ls9o3658bc64spef468tedfgi3s3e.apps.googleusercontent.com',
  appId: '1:110138948795:android:f62dc6c1a519cf859dfd9e',
  apiKey: 'AIzaSyCj_mbhS5e94psZD3DYRe5CJP_wJt6GkC8',
  databaseURL: 'https://safeamigos-66c18-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'safeamigos-66c18.appspot.com',
  // messagingSenderId: 'x',
  projectId: 'safeamigos-66c18',
  // enable persistence by adding the below flag
  persistence: true,
};

///Initialize Firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(androidConfig);
} else {
  firebase.app(); // if already initialized, use previous app
}


//Read data from db
firebase.database() //read
  .ref('users/')
  .once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
  });


//Set functions to run from emulator if in development mode
if (__DEV__) {
  console.log("--------in Emulator--------");
  // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
  firebase.functions().useFunctionsEmulator('http://10.0.2.2:5001');
}


//Adds contact to our Firebase Database
///---TO DO--- Run this on app launch and only update last added contact  for every new contact added
function AddEmergencyContact(name, number) {

  firebase.functions()
    .httpsCallable('helloWorld')({ fromName: usersName, fromPhoneNumber: usersPhoneNumber, name: name, toNumber: number, location: userLocation })
    .then(response => {
      console.log("Add Emergency User called succesfully!");
    })
    .catch((error) => console.log("Issue adding emergency User request " + error));

}


///Similar to emergency contact function above except it creates a new user entry in db 
function AddNewUser(name, number) {
  console.log("Adding New User TO Db");
  ///Get data from db and find the last entered contact
  firebase.database()
    .ref('users/')
    .once('value')
    .then(snapshot => {
      //newReference = returned json object from db
      const userRef = firebase.database()
        .ref('/users/')  //References all contacts added by current user
        .child(number);

      userRef
        .set({
          Name: name,
          location: userLocation,
        })
        .then(() => console.log('Data updated.'));
    }).catch(() => console.log("Issue getting user snapshot"));;
}

///-------------------End of Firebase-------------------------

///Function to initiate a call to required phone number
function SendCall() {
  //Call firebase function by name and pass json parameters relating to user
  firebase.functions()
    .httpsCallable('TwilioCall')({ fromName: usersName, fromPhoneNumber: usersPhoneNumber, toName: contactsName, toNumber: contactsNumber })
    .then(response => {
      console.log("Called Succesfully");
    });

}

///Function to initiate a call to required phone number
function SendText() {
  console.log("Sending Text Message to " + contactsNumber);
  //Call firebase function by name and pass json parameters relating to user
  firebase.functions()
    .httpsCallable('TwilioText')({ fromName: usersName, fromPhoneNumber: usersPhoneNumber, toName: contactsName, toNumber: contactsNumber })
    .then(response => {
      console.log("Called Succesfully");
    });

}

function DeclineContactRequest() {
  console.log("Sending Text Message to " + contactsNumber);
  //Call firebase function by name and pass json parameters relating to user
  firebase.functions()
    .httpsCallable('DeclineContactRequest')({ fromName: usersName, fromPhoneNumber: usersPhoneNumber, toName: contactsName, toNumber: contactsNumber })
    .then(response => {
      console.log("Request Declined Succesfully");
    }).catch(() => console.log("Issue declining request"));

}

//Temp function to decide if we should add a new user or add emergency contacts to that user
function ChangePage(name, number) {
  //If we should be at user page, then add new user to db, else add emergency contact under current Contact
  if (isUserPage) {
    console.log("----------Adding new user---------");
    usersName = name;
    usersPhoneNumber = number;
    AddNewUser(name, number);
    isUserPage = false;
  }
  else {
    console.log("----------Adding new Emergency Contact-------");
    contactsName = name;
    contactsNumber = number;
    AddEmergencyContact(name, number);
  }
}


///Called every time app is updated
const App = () => {

  //Sample location code courtesy of https://docs.expo.io/versions/latest/sdk/location/
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  userLocation = 'Waiting..';
  if (errorMsg) {
    userLocation = errorMsg;
  } else if (location) {
    userLocation = JSON.stringify(location);
  }

  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  return (
    <View>

      <Text style={styles.header}>Create New Contact</Text>

      <Text style={styles.textStyle}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        //value={text}
        placeholder="John Smith"
        autoCorrect={false}
        maxLength={40}
      //onChangeText={name => this.setName({name})}
      />
      <Text style={styles.textStyle}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNumber}
        value={number}
        placeholder="0861234567"
        keyboardType="numeric"
        maxLength={15}
      // onChangeText={(text) => this.setNumber({number:text})}
      />

      <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
        <Button
          title="Add contact"
          color="black"
          onPress={() => {
            ChangePage(name, number);
          }}
        />
      </View>

      <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
        <Button
          title="Send Text"
          color="red"
          onPress={() => {
            //SendText();
            SendCall();
          }}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 50,
    marginTop: 50
  },
  input: {
    fontSize: 25,
    marginLeft: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: "#20232a",
  },
  textStyle: {
    fontSize: 25,
    marginLeft: 10,
    padding: 10,
  }
});


export default App;

/*

<Text>
Your location + {userLocation}
</Text>*/
