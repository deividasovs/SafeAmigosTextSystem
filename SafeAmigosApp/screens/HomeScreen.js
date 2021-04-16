import React, { useState, useEffect } from 'react';
///import libs
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  Alert,
  AppRegistry,
  TextInput
} from 'react-native';

const HomeScreen = props => {
  return(
  <SafeAreaView>
    <Text style={{ textAlign: "center", fontSize: 30, padding: 20}}>Welcome Back!</Text>
    <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
       <Button style={styles.button}
    title = "Send Distress Signal"
    color = "black"
    onPress={() => {
            SendCall();
          }}
    />
    </View>
   
    <View style={{ margin: 20, borderRadius: 10, borderWidth: 2, }}>
    <Button
    title = "Add Emergency Contact"
    color= "black"
    onPress={() => {
      // go to create contacts page
        }}
  />
    </View>

    <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
       <Button style={styles.button}
    title = "Notifications"
    color = "black"
    onPress={() => {
        // go to notifcations page
          }}
    />
    </View>
    <Text style = {{paddingTop: 20, fontSize: 20, marginLeft: 20}}>Your Location: {"\n"}
    {userLocation}</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    fontSize: 100,
    marginTop: 500
  }
});

export default HomeScreen;