import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import {LoginScreen} from './src/screens/LoginScreen';
import ReservationScreen from './src/screens/ReservationScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import {kRoutes} from './src/utils/routes';
import React from 'react';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name={kRoutes.results}
          component={ResultsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={kRoutes.reservation}
          component={ReservationScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
