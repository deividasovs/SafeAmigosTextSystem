/**
 * @authors Deividas Ovsianikovas, <your names here>, , , , ,
 * @format
 * @flow strict-local
 */


///import libs
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


//imports generic screen for react 
import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';


/*geolocation lib
Install these if nto working
https://github.com/expo/expo
https://github.com/expo/expo/tree/master/packages/expo-location
*/
//import * as Location from 'expo-location';



///This gets called as soon as the app is opened / updated
const App: () => React$Node = () => {

  //Can call methods soon as app is opened to test, or call from UI inputs
  ConsoleTest();

  ///print out simple success message on app load, shows in vscode output
  function ConsoleTest()
  {
    console.log("App updated successfully!");
  }

  ///location method, from https://docs.expo.io/versions/latest/sdk/location/




  //Can create methods to send data to nodejs & add to firebase db here


  ///The markup of the app, similar to how HTML works
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>The Amigos</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


//The styling for above components, similar to way css works
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
