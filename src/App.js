import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

console.disableYellowBox = true;

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,
  Profile: ProfileScreen,
});
const AuthStack = createStackNavigator({Login: LoginScreen});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
