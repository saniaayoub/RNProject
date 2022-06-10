import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import navigationService from '../navigationService';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
    createChannel();
  }
}

const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('old Token', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('new token', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const createChannel = () => {
  PushNotification.createChannel({
    channelId: 'test-id', // (required)
    channelName: 'My channel', // (required)
  });
};

const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {
    showNotification(remoteMessage);
    console.log(remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
const showNotification = remoteMessage => {
  PushNotification.localNotification({
    channelId: 'test-id',
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
    bigText: remoteMessage.notification.body,
    color: 'red',
    id: 1,
  });
};

const setBackgroundListener = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    showNotification(remoteMessage);
    navigationService.navigate('Notifications');
    console.log(remoteMessage);
  });
};

export {
  requestUserPermission,
  getFCMToken,
  notificationListener,
  setBackgroundListener,
};
