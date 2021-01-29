import React from 'react';
import {Provider} from 'mobx-react';
import AuthStore from './screens/auth/AuthStore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TaskPage} from './screens/tasks/TaskPage';
import TasksStore from './screens/tasks/TasksStore';
import CheckAuthPage from './screens/auth/CheckAuthPage';
import {configure} from 'mobx';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './components/CustomDrawer';
import AuthUniversal from './components/AuthUniversal';

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

const App: () => React$Node = (props) => {
  const authProps = {
    title: 'Авторизация',
    sendText: 'Авторизируйтесь',
    unStore: 'sendAuth',
    titleAnotherScreen: 'Еще нет аккаунта?',
    navigatePage: 'AuthUniversalReg',
  };
  const regProps = {
    title: 'Ркгистрация',
    sendText: 'Зарегистрироваться',
    unStore: 'sendReg',
    titleAnotherScreen: 'Уже есть аккаунт?',
    navigatePage: 'AuthUniversalAuth',
  };
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
              name="AuthUniversalAuth"
              component={(props) => <AuthUniversal {...props} {...authProps} />}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AuthUniversalReg"
              component={(props) => <AuthUniversal {...props} {...regProps} />}
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
