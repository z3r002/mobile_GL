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
const stores = {
  auth: AuthStore,
};
const App: () => React$Node = () => {
  return (
    <>
      <Provider {...stores}>
        <AuthPage />
      </Provider>
    </>
  );
};

export default App;
