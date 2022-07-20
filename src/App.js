import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Details from './pages/Details';
import Services from './pages/Services';

import Create from './pages/Create';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerTitleAlign: 'center', title: 'UPayments Store'}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{headerTitleAlign: 'center', title: 'Details'}}
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{headerTitleAlign: 'center', title: 'Services'}}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{headerTitleAlign: 'center', title: 'Create'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
