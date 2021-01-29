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

export const AuthUniversal = inject('auth')(
  observer(
    ({
      title,
      sendText,
      unStore,
      titleAnotherScreen,
      navigatePage,
      auth,
      navigation,
    }) => {
      const Input = (name, type = 'text') => (
        <TextInput
          value={auth.valuesAuth[name]}
          onChangeText={(value) => auth.setValues(name, value)}
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
                <Text>{title}</Text>
              </View>

              {Input('email')}
              {Input('password')}

              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, marginRight: 10}}>
                  <Button
                    title={sendText}
                    onPress={() =>
                      auth[unStore]()
                        .catch((error) =>
                          console.log('COMPONENT', error?.error?.message),
                        )
                        .finally(() => navigation.replace('CheckAuthPage'))
                    }
                  />
                </View>
                <View style={{flex: 1}}>
                  <Button
                    title={titleAnotherScreen}
                    onPress={() => navigation.navigate(`${navigatePage}`)}
                  />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </>
      );
    },
  ),
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

export default AuthUniversal;
