import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppAction} from '../../store/actions';
import Store from '../../store';
import {NavigationService} from '..';

/* The following lines will add access token in every request to server */

let userAccessToken = Store.getState()?.AppReducer?.user?.access_token
  ? Store.getState()?.AppReducer?.user?.access_token
  : '';
Axios.defaults.headers.common['access_token'] = userAccessToken;

Axios.interceptors.response.use(
  response => {
    return response;
  },
  ({response}) => {
    if (response.status == 401) {
      try {
        AsyncStorage.removeItem('user').then(() => {
          Store.dispatch(AppAction.SignoutSuccess());
          NavigationService.reset_0('Signin');
        });
        console.log('%c{Error 401}', 'color: red', response);
      } catch (err) {
        console.log(`%c${err.name}`, 'color: red', err?.message);
      }
    } else {
      let status = response?.status.toString();
      console.log(
        `%c${status[0] == '2' ? 'Response ' : 'Error ' + status}`,
        `color: ${status[0] == '2' ? 'green' : 'red'}`,
        response,
      );
    }
    return response;
  },
);

export default class ApiCaller {
  static Get = async (endPoint = '', headers = {}) => {
    return await Axios.get(`${endPoint}`, {
      headers,
    })
      .then(res => {
        console.log('api response', res);
        return res;
      })
      .catch(err => err.response);
  };

  static Post = async (endPoint = '', body = {}, headers = {}) => {
    return await Axios.post(`${endPoint}`, body, {
      headers,
    })
      .then(res => {
        return res;
      })
      .catch(err => err.response);
  };

  static Put = async (endPoint = '', body = {}, headers = {}) => {
    return await Axios.put(`${endPoint}`, body, {
      headers,
    })
      .then(res => res)
      .catch(err => err.response);
  };
}
