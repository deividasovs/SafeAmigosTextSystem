/**
 * @authors Deividas Ovsianikovas, Elliott Mcstay, Ryan Glynn, Evan Sourke, Padraig Halsted
 * @flow strict-local
 */

import Controller from './screens/SampleAppScreen'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import ContactsScreen from './screens/CreateContactsScreen';
import CreateContactsScreen from './screens/CreateEmergencyContactScreen';
import CreateUserScreen from './screens/CreateUserScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    CreateContact: CreateEmergencyContactScreen,
    CreateUser: CreateUserScreen,
    Location: LocationScreen
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
      title: 'App',
    },
  }
);

///Called every time app is updated
const App = () => {
  return (Controller.instance.screen1());
};

export default createAppContainer(navigator);
export default App;
