import React from 'react';
import {Text} from 'react-native';
import {inject} from 'mobx-react';

const CustomDrawer = inject('auth')((props) => {
  return (
    <>
      <Text style={{margin: 20}}>Вы вошли как: {props.auth.username}</Text>
      <Text
        style={{color: 'blue', margin: 20}}
        onPress={() => {
          props.auth
            .logout()
            .finally(() => props.navigation.navigate('AuthPage'));
        }}>
        Logout
      </Text>
    </>
  );
});

export default CustomDrawer;
