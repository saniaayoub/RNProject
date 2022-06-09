import React, {Component} from 'react';
import {
  AppRegistry,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Colors, Constants} from './src/config';
import {Provider} from 'react-redux';
import Store from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import auth from '@react-native-firebase/auth';

import NavigationService from './src/config/navigationService';

class AppView extends Component {
  state = {
    initializing: true,
  };
  componentDidMount() {
    // To add temprory user to be logged in with same credintials
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        NavigationService.navigate('Weather');
      },
      requestPermissions: Platform.OS === 'ios',
    });

    // AsyncStorage.setItem('TempUser', JSON.stringify(Constants.TempUser));
  }

  render() {
    return Platform.OS == 'ios' ? (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.Secondary}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <Provider store={Store}>
            <App />
          </Provider>
        </KeyboardAvoidingView>
      </SafeAreaView>
    ) : (
      <Provider store={Store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppView);
