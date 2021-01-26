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
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 10}}>
                <Button
                  title="Войти"
                  onPress={() => {
                    props.auth
                      .sendAuth()
                      .finally(() => props.navigation.replace('CheckAuthPage'));
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <Button
                  title="Еще нет аккаунта?"
                  onPress={() => props.navigation.navigate('RegPage')}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }),
);
const styles = StyleSheet.create({
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
  },
});

export default AuthPage;
