import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from './screens/HomeScreen';
import CreateUserScreen from './screens/CreateUserScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    CreateUser: CreateUserScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App',
    },
  }
);

const App = createAppContainer(navigator);

export default App;
