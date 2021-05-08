import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

///import libs
import Home from './screens/HomeScreen';
import CreateEmergencyContactScreen from './screens/CreateEmergencyContactScreen';
import AddUserScreen from './screens/AddUserScreen';

const Stack = createStackNavigator();

///Singleton pattern with UI instances
function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddUserScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#d350be',
          },
          headerTintColor: '#fff',
        }} >

        <Stack.Screen name="AddUserScreen" component={AddUserScreen}
          options={{
            title: 'Welcome to SafeAmigos!',
          }} />

        <Stack.Screen name="Home"
          component={Home}
        />

        <Stack.Screen
          name="CreateContact"
          component={CreateEmergencyContactScreen}
          options={{
            title: 'Add Emergency Contact',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;


