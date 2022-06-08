import React, {Component} from 'react';
import {View, Text, Image, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Button, Forminput} from '../../components';
import {Metrix, Images, Utils, Constants} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';
import {NavigationService} from '../../config';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    emailErrMsg: '',
    passErrMsg: '',
    validEmail: true,
    validPass: true,
  };

  signin = () => {
    const {email, password, validEmail, validPass} = this.state;
    const {signin} = this.props;
    if (!email) this.setState({emailErrMsg: 'Email is a required field'});
    if (!password) this.setState({passErrMsg: 'Password is a required field'});
    else if (!validEmail)
      this.setState({emailErrMsg: 'Please enter valid email address.'});
    else if (!validPass) this.setState({passErrMsg: 'Password is not valid'});
    else signin({email, password});
  };

  validateEmail = email => {
    let validEmail = Utils.isEmailValid(email);
    this.setState({email, validEmail, emailErrMsg: ''});
  };

  validatePass = password => {
    let validPass = Utils.isPasswordValid(password);
    this.setState({password, validPass, passErrMsg: ''});
  };
  signUp = () => {
    const {navigate} = NavigationService;
    navigate('SignUp');
  };
  render() {
    const {email, password, emailErrMsg, passErrMsg} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          style={{width: '100%'}}>
          <View style={styles.content}>
            <Image
              source={Images.Logo}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.headingStyle}>Login</Text>
            <Forminput.TextField
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={this.validateEmail}
              errMsg={emailErrMsg}
              value={email}
              blurOnSubmit={false}
              containerStyle={{marginTop: Metrix.VerticalSize(25)}}
              onSubmitEditing={() => {
                this.passInputRef.focus();
              }}
            />

            <Forminput.TextField
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
              onChangeText={this.validatePass}
              errMsg={passErrMsg}
              value={password}
              containerStyle={{marginTop: Metrix.VerticalSize(15)}}
              reference={ref => {
                this.passInputRef = ref;
              }}
              onSubmitEditing={this.signin}
            />

            <Text
              style={styles.forgetPassText}
              onPress={() => {
                NavigationService.navigate('ForgotPass');
              }}>
              Forgot Password?
            </Text>

            <Button.Standard
              text="Sign In"
              isLoading={this.props.loading}
              disabled={this.props.loading}
              onPress={this.signin}
              containerStyle={{marginTop: Metrix.VerticalSize(35)}}
            />
            <Text
              style={styles.forgetPassText}
              onPress={() => {
                this.signUp();
              }}>
              Don't Have an account? Sign Up
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signin: payload => {
      dispatch(AppAction.SignIn(payload));
    },
  };
}

function mapStateToProps(state) {
  return {
    loading: state.AppReducer.loader,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
