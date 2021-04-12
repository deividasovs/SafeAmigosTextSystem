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

const CreateContactsScreen = props => {
  return(
  <SafeAreaView>
    <Text style={styles.header}>Contact Details</Text>

<Text style={styles.textStyle}>Name:</Text>
<TextInput
  style={styles.input}
  //onChangeText={setName}
  //value={text}
  placeholder="John Smith"
  autoCorrect={false}
  maxLength={40}
//onChangeText={name => this.setName({name})}
/>
<Text style={styles.textStyle}>Phone Number:</Text>
<TextInput
  style={styles.input}
  //onChangeText={setNumber}
 // value={number}
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
            console.log("Contact added sucessfully");
          }}
        />
      </View>

      <View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
        <Button
          title="Home"
          color="black"
          onPress={() => {
            onPress={() => props.navigation.navigate('Home')};
          }}
        />
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
    }
  });

export default CreateContactsScreen;