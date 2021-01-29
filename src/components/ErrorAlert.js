import {Alert} from 'react-native';

export default function (response) {
  Alert.alert(
    `${response.error.name}`,
    `${response.error.message}`,
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: false},
  );
}
