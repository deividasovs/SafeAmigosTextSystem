/**
 * @authors Deividas Ovsianikovas, <your names here>, , , , ,
 * @format
 * @flow strict-local
 */

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


/*geolocation lib*/
//import database from '@react-native-firebase/database';
import * as Location from 'expo-location';
//import { helloWorld } from '../BackEnd/functions';

function addContact (name, number ) {
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


///This gets called as soon as the app is opened / updated
const App: () => ReactNode = () => {



  //Sample code courtesy of https://docs.expo.io/versions/latest/sdk/location/
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




  //--------Get Data from hosted Firebase link ----------------------
  function GetData()
  {
   // var index = require('/SafeAmigos/Backend/functions/index.js');
  //  console.log(index.helloWorld());

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
       
       <View style={{margin:20, borderRadius: 10, borderWidth: 2}}>
        <Button
          title="Add contact"
          color="black"
          onPress={() => {
            addContact(name, number);
          }}
          />  
        </View>

      <View style={{margin:20, borderRadius: 10, borderWidth: 2}}>
        <Button
          title="Get Help"
          color="red"
          />  
        </View>
               
    </View>
);
};

const styles = StyleSheet.create({
header:{
  textAlign: "center",
  fontSize: 50,
  marginTop: 50
},
input:{
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
