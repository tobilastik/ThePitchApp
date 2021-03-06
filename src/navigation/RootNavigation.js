import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Notes from '../screens/Notes';
import Explore from '../screens/Explore';
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const MoreScreen = createStackNavigator ({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => {
      return {
        header: null,
      };
    },
  },
});

const DashboardBottom = createBottomTabNavigator (
  {
    Home: {
      screen: MoreScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        activeTintColor: '#2b3a75',
        tabBarIcon: ({tintColor}) => (
          <Ionicons name="ios-home" color={tintColor} size={20} />
        ),
      },
    },
    Notes: {
      screen: Notes,
      navigationOptions: {
        tabBarLabel: 'Notes',
        activeTintColor: '#2b3a75',
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="sticky-note" color={tintColor} size={20} />
        ),
      },
    },
    Explore: {
      screen: Explore,
      navigationOptions: {
        tabBarLabel: 'Explore',
        activeTintColor: '#2b3a75',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name="google-maps"
            color={tintColor}
            size={20}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#2b3a75',
    },
  }
);
const Auth = createStackNavigator (
  {
    Welcome: {screen: Welcome},
    Login: {screen: Login},
    Signup: {screen: Signup},
  },
  {
    initialRouteName: 'Welcome',
  }
);

const RootNavigation = createSwitchNavigator ({
  AuthLoading: AuthLoadingScreen,
  Auth,
  DashboardBottom,
});

export default createAppContainer (RootNavigation);
