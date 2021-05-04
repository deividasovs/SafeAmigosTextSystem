import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

///Import Libaries
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
  TextInput,
  useState,
  useEffect
} from 'react-native';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateContact" component={CreateEmergencyContactScreen} />
        <Stack.Screen name="User" component={CreateUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen ({ navigation }) {
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
      onPress={() => navigation.navigate('CreateContact')}
    />
      </View>
  
      <View style={{ margin: 20, borderRadius: 10, borderWidth: 2, }}>
      <Button
      title = "Add Your Details"
      color= "black"
      onPress={() => navigation.navigate('User')}
    />
      </View>
  
      <View style={{ margin: 20, borderRadius: 10, borderWidth: 2, }}>
      <Button
      title = "Camera"
      color= "black"
     // onPress={( takePicture())}
    />
      </View>
      </SafeAreaView>
    );
  };


function CreateUserScreen() {
  return(
  <SafeAreaView>
    <Text style={styles.header}>Your Details</Text>

<Text style={styles.textStyle}>Your Name:</Text>
<TextInput ref={input => { this.textInputName = input }}
  style={styles.input}
  onChangeText={setName}
  value={text}
  placeholder="John Smith"
  autoCorrect={false}
  maxLength={40}
  onChangeText={name => this.setName({name})}
/>
<Text style={styles.textStyle}>Your Phone Number:</Text>
<TextInput ref={input => { this.textInputNumber = input }}
  style={styles.input}
 onChangeText={setNumber}
  value={number}
  keyboardType="numeric"
  maxLength={15}
 onChangeText={(text) => this.setNumber({number:text})}
/>
<View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
        <Button
          title="Add/update details"
          color="black"
          onPress={() => {
            this.textInputNumber.clear();
            this.textInputName.clear();
            //Add user details
          }}
        />
      </View>
    </SafeAreaView>
  );
};


function CreateEmergencyContactScreen () {
  return(
  <SafeAreaView>
    <Text style={styles.header}>Contact Details</Text>

<Text style={styles.textStyle}>Name:</Text>
<TextInput ref={input => { this.textInputName = input }}
  style={styles.input}
  onChangeText={setName}
  value={text}
  placeholder="John Smith"
  autoCorrect={false}
  maxLength={40}
onChangeText={name => this.setName({name})}
/>
<Text style={styles.textStyle}>Phone Number:</Text>
<TextInput ref={input => { this.textInputNumber = input }}
  style={styles.input}
  onChangeText={setNumber}
 value={number}
  keyboardType="numeric"
  maxLength={15}
 onChangeText={(text) => this.setNumber({number:text})}
/>
<View style={{ margin: 20, borderRadius: 10, borderWidth: 2 }}>
        <Button
          title="Add contact"
          color="black"
          onPress={() => {
            this.textInputNumber.clear();
            this.textInputName.clear();
            
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

export default App;