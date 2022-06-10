import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationService} from './config';
import {MainStackNavigator} from './config/navigationConfig';

const Navigation = ({initialRoute}) => {
  useEffect(() => {
    console.log(initialRoute);
  });
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <MainStackNavigator initialRoute={initialRoute} />
    </NavigationContainer>
  );
};
export default Navigation;
