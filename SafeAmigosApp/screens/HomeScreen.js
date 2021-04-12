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
    <Text>Welcome Back User</Text>
    <Button
    onPress={() => props.navigation.navigate('Users')}
    title = "Add User"
    />
    <Button style={styles.button}
    title = "Send Distress Signal"
    onPress={() => {
            SendCall();
          }}
    />
    <Button
    title = "Add Emergency Contact"
    />
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