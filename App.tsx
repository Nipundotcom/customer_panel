import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import InsertLeadScreen from './InsertLeadScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="InsertLead" component={InsertLeadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
