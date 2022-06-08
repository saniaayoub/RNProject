import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {Colors} from './src/config';
import Route from './src';
import RNBootSplash from 'react-native-bootsplash';
// import Loader from './src/components/Loader';
// import { ToastComponent } from './src/components';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      setTimeout(() => {
        RNBootSplash.hide({fade: true});
      }, 1000);
    });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.Secondary}}>
      <StatusBar backgroundColor={Colors.Primary} barStyle="light-content" />
      {/* <Loader /> */}
      <Route />
      {/* <ToastComponent/> */}
    </View>
  );
};

export default App;
