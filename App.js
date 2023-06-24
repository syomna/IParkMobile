import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import {LoginScreen} from './src/screens/LoginScreen';
import ReservationScreen from './src/screens/ReservationScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import {kRoutes} from './src/utils/routes';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Toast from 'react-native-toast-message';
import SignupScreen from './src/screens/SignupScreen';
import SplashScreen from './src/screens/SplashScreen';
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={kRoutes.splash}
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={kRoutes.home}
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={kRoutes.login}
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={kRoutes.signup}
            component={SignupScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={kRoutes.results}
            component={ResultsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={kRoutes.reservation}
            component={ReservationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}

export default App;
