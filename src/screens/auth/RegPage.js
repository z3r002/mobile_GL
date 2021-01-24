import {inject, observer} from 'mobx-react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';

export const RegPage = inject('auth')(
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
              <Text>Зарегистрируйтесь</Text>
            </View>

            {Input('email')}
            {Input('username')}
            {Input('password')}

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 10}}>
                <Button title="регистрация" onPress={props.auth.sendAuth} />
              </View>
              <View style={{flex: 1}}>
                <Button
                  title="уже есть аккаунт?"
                  onPress={() => props.navigation.navigate('AuthPage')}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }),
);
export const styles = StyleSheet.create({
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

export default RegPage;
