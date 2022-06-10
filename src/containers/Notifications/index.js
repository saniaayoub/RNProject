import React, {Component, useEffect, useState} from 'react';
import {View, ScrollView, Text, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {Button, Forminput, Header} from '../../components';
import {Metrix, NavigationService, Utils} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';
import {
  requestUserPermission,
  notificationListener,
} from '../../config/notificationService';
const Notifications = () => {
  const dispatch = useDispatch();
  const [message, setmessage] = useState('');
  const [validmessage, setValidmessage] = useState(false);
  const [messageErrorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  const sendMessage = () => {};
  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-id', // (required)
      channelName: 'My channel', // (required)
    });
  };

  return (
    <View style={styles.container}>
      <Header.Standard
        leftIconName={'arrow-left'}
        onPressLeft={NavigationService.goBack}
        Heading={'Messenger'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        style={{width: '100%'}}>
        <View style={styles.content}>
          <View style={{marginBottom: Metrix.VerticalSize(20)}}>
            <Forminput.TextField
              placeholder="Write Text"
              returnKeyType="done"
              onChangeText={message => {
                setmessage(message);
              }}
              value={message}
              blurOnSubmit={false}
              errMsg={messageErrorMsg}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <Button.Standard text="Send" onPress={() => sendMessage()} />
          {/* {loader ? (
            <ActivityIndicator />
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  marginVertical: Metrix.VerticalSize(15),
                  color: 'white',
                  fontSize: Metrix.FontExtraLarge,
                }}>
                {weatherInfo.name}
              </Text>
              <Icon
                name={'cloud'}
                color={'skyblue'}
                size={Metrix.VerticalSize(100)}
              />
              <Text style={{color: 'yellow'}}>{weatherInfo.main?.temp}</Text>
            </View>
          )} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
