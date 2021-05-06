import React, { useState, useEffect } from 'react';
///import libs
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  Modal,
  Pressable,
  Alert,
  AppRegistry,
  TextInput
} from 'react-native';

const CreateUserScreen = props => {
  return(
  <SafeAreaView>
      <View style={StyleSheet.container}>
    <Text style={styles.header}>Notifications</Text>



<View style={{ margin: 20, borderRadius: 10, borderWidth: 2, }, StyleSheet.footer}>
        <Button
          title="Home"
          color="black"
          onPress={() => {
            this.textInputNumber.clear();
            this.textInputName.clear();
            //Go to the home page
          }}
        />
      </View>
    </View>
    </SafeAreaView>
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
    },
    footer: {
        flexDirection: 'column',
    },
    container: {
        justifyContent: 'space-between',
    }
  });

export default CreateUserScreen;