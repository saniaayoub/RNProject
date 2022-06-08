import React, {Component, useEffect, useState} from 'react';
import {View, ScrollView, Text, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Forminput, Header} from '../../components';
import {Metrix, NavigationService, Utils} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Weather = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('Karachi');
  const [validCity, setValidCity] = useState(false);
  const [cityErrorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    dispatch(AppAction.WeatherCheck({city}));
  }, []);

  const weatherInfo = useSelector(state => state.AppReducer.weatherData);
  const loader = useSelector(state => state.AppReducer.loader);
  const checkWeather = () => {
    if (!city) setErrorMsg('Please Enter city.');
    else if (!validCity) setErrorMsg('Please enter valid city');
    else {
      dispatch(AppAction.WeatherCheck({city}));
    }
  };

  return (
    <View style={styles.container}>
      <Header.Standard
        leftIconName={'arrow-left'}
        onPressLeft={NavigationService.goBack}
        Heading={'Weather'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        style={{width: '100%'}}>
        <View style={styles.content}>
          <View style={{marginBottom: Metrix.VerticalSize(20)}}>
            <Forminput.TextField
              placeholder="Enter City"
              returnKeyType="done"
              onChangeText={city => {
                let validate = Utils.isFullNameValid(city);
                setCity(city);
                setValidCity(validate);
                setErrorMsg('');
              }}
              value={city}
              blurOnSubmit={false}
              errMsg={cityErrorMsg}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
            />
          </View>
          <Button.Standard
            text="Check Weather"
            onPress={() => checkWeather()}
          />
          {loader ? (
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
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Weather;
