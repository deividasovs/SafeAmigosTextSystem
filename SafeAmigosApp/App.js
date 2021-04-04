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


import * as firebase from 'firebase';
import * as Location from 'expo-location';
//import functions from '@react-native-firebase/functions';

AppRegistry.registerComponent('main', () => App);


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
function addContact(name, number) {
  const newReference = firebase.database()
    .ref('/users')
    .push();

  console.log('Auto generated key: ', newReference.key);

  newReference
    .set({
      full_name: name,
      phone_number: number,
    })
    .then(() => console.log('Data updated.'));
}

  ///Function to initiate a call to required phone number
  function SendCall() {
    //Call firebase function by name and pass json parameters relating to user
     firebase.functions()
      .httpsCallable('TwilioCall')({name:"testName", phoneNumber:"+353862246656"})
      .then(response => {
        console.log("Called Succesfully");
      });

  }

///-------------------End of Firebase-------------------------



///This gets called as soon as the app is opened / updated
const App: () => ReactNode = () => {

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

  let userLocation = 'Waiting..';
  if (errorMsg) {
    userLocation = errorMsg;
  } else if (location) {
    userLocation = JSON.stringify(location);
  }

  //Can call methods soon as app is opened to test, or call from UI inputs
  ConsoleTest();
  ///print out simple success message on app load, shows in vscode output
  function ConsoleTest() {
    console.log("App updated successfully! Users location: \n" + userLocation + "\n");
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
        maxLength={10}
      // onChangeText={(text) => this.setNumber({number:text})}
      />

      <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
        <Button
          title="Add contact"
          color="black"
          onPress={() => {
            addContact(name, number);
          }}
        />
      </View>

      <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
        <Button
          title="Get Help"
          color="red"
          onPress={() => {
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
