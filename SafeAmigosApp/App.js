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
  AppRegistry
} from 'react-native';


/*geolocation lib*/
import * as Location from 'expo-location';
import { helloWorld } from '../BackEnd/functions';


AppRegistry.registerComponent('main',() => App);

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
    console.log("App updated successfully! Users location: " + userLocation);
  }




  //--------Get Data from hosted Firebase link ----------------------
  function GetData()
  {
    var index = require('/SafeAmigos/Backend/functions/index.js');
    console.log(index.helloWorld());

  }




  ///The markup of the app, similar to how HTML works
  ///Note how the curly braces look when setting styling
  return (
    <>
      <View style = {styles.View}>
        <Text style = {{fontSize: 30}}>
          Lil Text
        </Text>
        <Button 
          title = "SOMETHING"
          color = ""
          onPress={() => Alert.alert('Something more')}
        />

        <Text style={styles.someTextStyle}>
          Another Example
        </Text>

        <Text>
          Your location + {userLocation}
        </Text>

      </View>

    </>
  );
};


//The styling for above components, similar to way css works
const styles = StyleSheet.create({
  someTextStyle: {
    color: "red",
    marginTop: 20,
  },

  View: {
    margin: 30,
  },
});

export default App;
