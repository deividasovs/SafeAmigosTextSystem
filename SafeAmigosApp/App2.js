import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import ContactsScreen from './screens/CreateContactsScreen';
import CreateContactsScreen from './screens/CreateContactsScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    CreateContact: CreateContactsScreen
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
      title: 'App',
    },
  }
);

export default createAppContainer(navigator);
