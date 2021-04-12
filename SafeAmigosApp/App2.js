import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import ContactsScreen from './src/screens/ContactsScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Users: UsersScreen,
    Emergency: EmergencyContactsScreen
  },
  {
    initialRouteName: 'Components',
    defaultNavigationOptions: {
      title: 'App',
    },
  }
);

export default createAppContainer(navigator);
