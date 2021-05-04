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

export default createAppContainer(navigator);
