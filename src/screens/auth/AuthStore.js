import {action, makeObservable, observable} from 'mobx';
import Network from '../../services/Network';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStore {
  constructor() {
    makeObservable(this);
  }

  @observable valuesAuth = {
    email: '',
    username: '',
    password: '',
  };

  @action setValues = (name, value) => {
    this.valuesAuth[name] = value;
  };

  @action
  sendReg = async (event) => {
    event.preventDefault();
    try {
      let body = {
        username: this.valuesAuth.username,
        email: this.valuesAuth.email,
        password: this.valuesAuth.password,
      };
      await Network('users', 'POST', body);
    } catch (e) {
      console.log(e);
    }
  };
  @action
  sendAuth = async (event) => {
    event.preventDefault();
    //taskkill /F /IM node.exe  react-native start --reset-cache

    try {
      let body = {
        email: this.valuesAuth.email,
        password: this.valuesAuth.password,
      };
      const response = await Network('users/login', 'POST', body);
      console.log(response);
      await AsyncStorage.setItem('token', response.id);
      const tok = await AsyncStorage.getItem('token');
      console.log(tok);
    } catch (e) {
      console.log(e);
    }
  };

  @action
  logOut = async () => {
    await AsyncStorage.removeItem('token');
  };
}

const authStore = new AuthStore();
export default authStore;
