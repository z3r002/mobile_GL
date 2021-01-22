import {inject, observer} from 'mobx-react';
import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,

  TextInput,
} from 'react-native';


const AuthPage = inject('auth')(
  observer((props) => {
    const Input = (name, type = 'text') => (
      <TextInput
        value={props.auth.valuesAuth[name]}
        onChangeText={(value) => props.auth.setValues(name, value)}
        type={type}
        style={styles.input}
        placeholder={name}
      />
    );

    return (
      <>
        <SafeAreaView>
          <View style={styles.main}>
            <View>
              <Text>Авторизируйтесь</Text>
            </View>

            {Input('email')}
            {Input('password')}

            <Button
              title="Войти"
              style={styles.button}
              onPress={props.auth.sendAuth}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }),
);
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#32CD32',
    color: 'white',
    marginTop: 20,
    marginRight: 'auto',
    marginBottom: 20,
    marginLeft: 'auto',
    borderWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    bottom: 0,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    fontWeight: 'bold',
  },

  main: {
    marginTop: 25,
    marginRight: 'auto',
    marginBottom: 25,
    marginLeft: 'auto',
    display: 'flex',
    height: 400,
    width: 370,
    flexWrap: 'nowrap',
    flexDirection: 'column',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  // input: {
  //   width: '70%',
  //   paddingTop: 0,
  //   paddingRight: 0,
  //   paddingBottom: 10,
  //   paddingLeft: 0,
  //   borderWidth: 0,
  //   borderColor: 'black',
  //   borderStyle: 'solid',
  //   //borderBottom: '1px solid #e0e0e0',
  //   backgroundColor: 'transparent',
  //
  //   marginTop: 20,
  //   marginRight: 'auto',
  //   marginBottom: 20,
  //   marginLeft: 'auto',
  // },
  form_title: {
    textAlign: 'center',
    fontWeight: 'normal',
  },
  new_account: {
    color: '#32CD32',
    textAlign: 'center',
  },
});
export default AuthPage;
