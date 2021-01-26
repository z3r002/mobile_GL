import React from 'react';
import {Provider} from 'mobx-react';
import AuthStore from './screens/auth/AuthStore';
import AuthPage from './screens/auth/AuthPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RegPage from './screens/auth/RegPage';
import {TaskPage} from './screens/tasks/TaskPage';
import TasksStore from './screens/tasks/TasksStore';
import CheckAuthPage from './screens/auth/CheckAuthPage';
import {configure} from 'mobx';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './components/CustomDrawer';

configure({
  enforceActions: 'never',
});

const stores = {
  auth: AuthStore,
  tasks: TasksStore,
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MyDrawer = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen name="TaskPage" component={TaskPage} />
  </Drawer.Navigator>
);

const App: () => React$Node = () => {
  return (
    <>
      <Provider {...stores}>
        <NavigationContainer>
          <Stack.Navigator initalRouteName="CheckAuthPage">
            <Stack.Screen
              name="CheckAuthPage"
              component={CheckAuthPage}
              options={{headerShown: false}}
            />
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
            <Stack.Screen
              name="TaskPage"
              component={TaskPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={MyDrawer}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
