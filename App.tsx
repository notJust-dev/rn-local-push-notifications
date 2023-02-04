import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from './screens/Detail';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
