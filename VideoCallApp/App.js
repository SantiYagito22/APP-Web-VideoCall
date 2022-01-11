import 'expo-dev-client';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Call from './src/Call';



export default function App (){
  const Stack = createNativeStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component = {Home}
          options= {{title:'Home'}}
        />
        <Stack.Screen
          name='Call'
          component = {Call}
          options= {{title:'Call'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
