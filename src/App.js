/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'mobx-react';
import AuthStore from './screens/auth/AuthStore';
import AuthPage from './screens/auth/AuthPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RegPage from './screens/auth/RegPage';
const stores = {
  auth: AuthStore,
};

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <Provider {...stores}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AuthPage">
            <Stack.Screen
              name="AuthPage"
              component={AuthPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RegPage"
              component={RegPage}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
