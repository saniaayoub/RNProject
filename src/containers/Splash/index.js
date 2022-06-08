import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';
import {Images, NavigationService} from '../../config';
import {AppAction} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

class Splash extends Component {
  componentDidMount() {
    this.checkUser();
  }

  checkUser = () => {
    setTimeout(() => {
      AsyncStorage.getItem('user').then(user => {
        if (user) {
          console.log('user', user);
          const parsedData = JSON.parse(user);
          this.props.SignInSuccess(parsedData);
          NavigationService.replace('Home');
        } else {
          NavigationService.replace('SignIn');
        }
      });
    }, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.Logo} style={styles.image} resizeMode="contain" />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SignInSuccess: payload => {
      dispatch(AppAction.SignInSuccess(payload));
    },
  };
}

export default connect(null, mapDispatchToProps)(Splash);
