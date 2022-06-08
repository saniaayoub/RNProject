import {AppAction} from '../actions';
import {Alert} from 'react-native';
import Store from '..';
import {NavigationService, ApiCaller, Constants} from '../../config';
import {put} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import base64 from 'react-native-base64';

const baseUrl = `https://api.spotify.com/v1`;
const apiPrefix = `https://accounts.spotify.com/api`;
const client_id = `ae9647085a894a05b0bddc7416f6618b`;
const client_secret = `dc164187b24a4bfa9232242318140db1`;

export default class AppMiddleware {
  static *SignIn({payload}) {
    const {email, password} = payload;
    const {replace} = NavigationService;
    try {
      let response = yield auth().signInWithEmailAndPassword(email, password);
      console.log(response);
      if (response.user) {
        yield put(AppAction.SignInSuccess(response.user));
        AsyncStorage.setItem('user', JSON.stringify(response.user));
        replace('Home');
      } else {
        yield put(AppAction.SignInFailure());
        Alert.alert('', 'Error: incorrect credentials');
        yield put(AppAction.SignInFailure());
      }
    } catch (e) {
      Alert.alert('hi', e.message);
      yield put(AppAction.SignInFailure());
    }
  }

  static *signUp({payload}) {
    const {goBack} = NavigationService;
    const {email, username, password} = payload;
    try {
      let response = yield auth().createUserWithEmailAndPassword(
        email,
        password,
        username,
      );
      if (response.user) {
        yield put(AppAction.SignUpSuccess());
        auth().signOut();
        Alert.alert('Account Created Successfully');
        console.log('response ?', response);
        goBack();
      } else {
        Alert.alert('', 'Some Error Occured');
        yield put(AppAction.SignUpFailure());
      }
    } catch (e) {
      console.error(e.code);
    }
  }
  static *Logout() {
    const {reset_0} = NavigationService;
    try {
      auth().signOut();
      yield AsyncStorage.removeItem('user');
      yield put(AppAction.LogoutSuccess());
      reset_0('SignIn');
    } catch (err) {
      yield put(AppAction.LogoutFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  static *AddPost({payload}) {
    const {userId} = Store.getState().AppReducer?.user;
    payload['userId'] = userId;
    try {
      let res = yield ApiCaller.Post(Constants.ENDPOINTS.POST, payload);
      if (res.status == 201) {
        // console.log('%cAddPost Response', 'color: green', ' => ', res);
        res.data['id'] = new Date().getTime();
        yield put(AppAction.AddPostSuccess(res.data));
        NavigationService.goBack();
      } else {
        console.log('%cAddPost Response', 'color: red', ' => ', res);
        yield put(AppAction.AddPostFailure());
      }
    } catch (err) {
      yield put(AppAction.AddPostFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  static *GetPosts() {
    try {
      let res = yield ApiCaller.Get(Constants.ENDPOINTS.POST);
      // console.log(res);
      if (res.status == 200) {
        console.log('%cGetPosts Response', 'color: green', ' => ', res);
        yield put(AppAction.GetPostsSuccess(res.data));
      } else {
        console.log('%cGetPosts Response', 'color: red', ' => ', res);
        yield put(AppAction.GetPostsFailure());
      }
    } catch (err) {
      yield put(AppAction.GetPostsFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  static *GetInfo() {
    try {
      const user = yield AsyncStorage.getItem('user');
      const uid = JSON.parse(user).uid;
      const docRef = yield firestore().collection('Users').doc(uid);
      const userData = yield docRef.get();
      // console.log('saga', userData._data);
      yield put(AppAction.GetInfoSuccess(userData._data));
    } catch (e) {
      // console.log('No info found', e.toString());
    }
  }

  static *SendEmail(payload) {
    try {
      yield auth().sendPasswordResetEmail(payload.payload);
      yield put(AppAction.SendEmailSuccess());
      Alert.alert(
        'Please Check your email and click on the link to reset your password',
      );
    } catch (e) {
      yield put(AppAction.SendEmailFailure());
      Alert.alert(e);
    }
  }

  static *SaveInfo({payload}) {
    console.log(payload);
    try {
      const user = yield AsyncStorage.getItem('user');
      const uid = JSON.parse(user).uid;
      console.log(uid);
      const docRef = yield firestore().collection('Users').doc(uid);
      yield docRef.set(payload);
      yield put(AppAction.SaveInfoSuccess());
      console.log('info saved');
    } catch (e) {
      yield put(AppAction.SaveInfoSuccess());
      Alert.alert('Not Inserted due to Error', e);
    }
  }

  static *ImgUpload({payload}) {
    const {image} = payload;
    try {
      const user = yield AsyncStorage.getItem('user');
      const uid = JSON.parse(user).uid;
      let imageName = uid + '.' + image.split('.').pop();
      // console.log('saga', imageName);
      // console.log(image);
      const reference = yield storage().ref(imageName);
      yield reference.putFile(image);
      yield put(AppAction.ImgUploadSuccess());
      Alert.alert('Profile picture updated successfully');
    } catch (e) {
      console.log(e);
      yield put(AppAction.ImgUploadFailure());
      Alert.alert('Profile picture not updated');
    }
  }

  static *ImgRetrieve() {
    let image = '';
    try {
      const user = yield AsyncStorage.getItem('user');
      const uid = JSON.parse(user).uid;
      let imageName = uid + '.jpg';
      // console.log('saga', imageName);
      const reference = yield storage().ref('/' + imageName);
      // console.log(reference);
      image = yield reference.getDownloadURL();
      console.log(image);
      yield put(AppAction.ImgRetrieveSuccess(image));
    } catch (e) {
      console.log(e);
      yield put(AppAction.ImgRetrieveFailure());
      Alert.alert('Error', e);
    }
  }

  static *WeatherCheck({payload}) {
    const {city} = payload;
    const apiKey = 'ca3582fd53c1b38d6d75c4b67b8a3ff2';
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      let res = yield ApiCaller.Get(api);
      if (res.status == 200) {
        const {main, name, wind} = res.data;
        yield put(AppAction.WeatherCheckSuccess({main, name, wind}));
      } else {
        console.log('API Response', 'color: red', ' => ', res);
        yield put(AppAction.WeatherCheckFailure());
      }
    } catch (e) {
      console.log(e);
      yield put(AppAction.WeatherCheckFailure());
      Alert.alert('Error', e);
    }
  }

  static *GetToken() {
    const base64Credentials = base64.encode(client_id + ':' + client_secret);
    try {
      const res = yield ApiCaller.Post(
        `${apiPrefix}/token`,
        'grant_type=client_credentials',
        {
          Authorization: `Basic ${base64Credentials}`,
          Content_Type: 'application/x-www-form-urlencoded',
        },
      );
      console.log('token', res.data.access_token);
      yield put(AppAction.GetTokenSuccess(res.data.access_token));
    } catch (e) {
      console.log(e);
      yield put(AppAction.GetTokenFailure());
    }
  }

  static *SearchSong({payload}) {
    const {offset, limit, q, spotify_token} = payload;
    console.log(offset, limit, q, spotify_token);
    const uri = `${baseUrl}/search?type=album,artist,playlist,track&limit=${limit}&offset=${offset}&q=${encodeURIComponent(
      q,
    )}*&include_external=audio`;
    try {
      const res = yield ApiCaller.Get(uri, {
        Authorization: `Bearer ${spotify_token}`,
      });
      if (res) {
        const {
          tracks: {items},
        } = JSON.parse(res.request._response);
        const songs = items.map(item => ({
          id: item.id,
          title: item.name,
          popularity: item.popularity,
          artist: item.artists ? item.artists[0].name : undefined,
          album: item.album.name,
          is_playable: item.is_playable,
          preview_url: item.preview_url,
          imageUri: item.album.images ? item.album.images[0].url : undefined,
          trackUri: item.uri,
        }));
        // console.log('songs', songs);
        yield put(AppAction.SearchSongSuccess(songs));
      }
    } catch (e) {
      console.log(e);
      yield put(AppAction.SearchSongFailure());
    }
  }
}
