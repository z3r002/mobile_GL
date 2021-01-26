import {action, computed, makeObservable, observable} from 'mobx';
import Network from '../../services/Network';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStore {
  constructor() {
    makeObservable(this);
    this.getUsername();
  }
  @observable isAuth = false;

  @observable username = '';

  @observable valuesAuth = {
    email: '',
    username: '',
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
  sendAuth = async () => {
    try {
      let body = {
        email: this.valuesAuth.email,
        password: this.valuesAuth.password,
      };
      const response = await Network('users/login', 'POST', body);
      console.log(response);
      await AsyncStorage.setItem('token', response.id);
      await AsyncStorage.setItem('username', this.valuesAuth.email);
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
