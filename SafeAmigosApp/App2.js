import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

///import libs
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
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
      <Text style={{ textAlign: "center", fontSize: 30, padding: 20, fontWeight: 350}}>Welcome Back!</Text>
      <View style={styles.button}>
         <Button style={styles.button}
      title = "Send Distress Signal"
      color= "#FF8C00"
      borderColor = "#FF8C00"
      onPress={() => {
              SendCall();
            }}
      />
      </View>
     
      <View style={styles.button}>
      <Button style={styles.button}
      title = "Add Emergency Contact"
      color= "#FF8C00"
      borderColor = "#FF8C00"
      onPress={() => navigation.navigate('CreateContact')}
    />
      
      <View style={styles.container>
      <Image source={require('./images/safeamigoslogo.png')} />
      <View/>
      
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
<View style={styles.button}>
        <Button style={styles.button}
          title="Add contact"
          color= "#FF8C00"
          borderColor = "#FF8C00"
          onPress={() => {
            this.textInputNumber.clear();
            this.textInputName.clear();
            
          }}
        />
      </View>


      <View style={styles.container>
      <Image source={require('./images/safeamigoslogo.png')} />
      <View/>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
    header: {
      textAlign: "center",
      fontSize: 50,
      marginTop: 50
    },
    input: {
      fontSize: 25,
      marginLeft: 10,
      padding: 15,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#20232a",
    },
    textStyle: {
      fontSize: 25,
      marginLeft: 10,
      padding: 10,
    },
    button: {
      margin: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#FF8C00",
      color: "#FF8C00"
    },
    circle:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#D350BE",

      }
  });

export default App;


<<<<<<< HEAD
=======
const App = createAppContainer(navigator);

export default App;
>>>>>>> 3d5d9ff82a75fc0fcc77255c1d9881d67551b8b7
