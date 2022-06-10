import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
import {Colors} from './src/config';
import Route from './src';
import RNBootSplash from 'react-native-bootsplash';
// import Loader from './src/components/Loader';
// import { ToastComponent } from './src/components';

const App = () => {
  const [color, setColor] = useState('black');
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };
    setInitialRoute('Weather');
    init().finally(async () => {
      setTimeout(() => {
        RNBootSplash.hide({fade: true});
      }, 100);
    });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: color}}>
      <StatusBar backgroundColor={Colors.Primary} barStyle="light-content" />
      {/* <Loader /> */}
      <Route initialRoute={initialRoute} />
      {/* <ToastComponent/> */}
    </View>
  );
};

export default App;
