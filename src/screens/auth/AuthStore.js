import {action, computed, makeObservable, observable} from 'mobx';
import Network from '../../services/Network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import ErrorAlert from '../../components/ErrorAlert';

class AuthStore {
  constructor() {
    makeObservable(this);
    this.getUsername();
  }
  @observable isAuth = false;

  @observable username = '';

  @observable valuesAuth = {
    email: '',
    password: '',
  };

  @action getUsername = async () =>
    (this.username = await AsyncStorage.getItem('username'));

  @action setValues = (name, value) => {
    this.valuesAuth[name] = value;
  };
  @action
  check = async () => {
    const token = await AsyncStorage.getItem('token');
    this.isAuth = !!token;
  };

  @action
  logout = async () => {
    return AsyncStorage.removeItem('token');
  };

  @action
  sendReg = async () => {
    try {
      let body = {
        email: this.valuesAuth.email,
        password: this.valuesAuth.password,
      };
      const response = await Network('users', 'POST', body);
      console.log('REG', response);
      if (!response.ok) {
        ErrorAlert(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  @action
  sendAuth = async () => {
    try {
      let body = {
        email: this.valuesAuth.email,
        password: this.valuesAuth.password,
      };
      const response = await Network('users/login', 'POST', body);
      if (response?.id) {
        await AsyncStorage.setItem('token', response?.id);
        await AsyncStorage.setItem('username', this.valuesAuth.email);
      } else {
        ErrorAlert(response);
      }
    } catch (e) {
      console.log('STORE', e);
      return e;
    }
  };

  @action
  logOut = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
  };
}

const authStore = new AuthStore();
export default authStore;
