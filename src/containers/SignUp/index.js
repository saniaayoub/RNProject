import React, {Component} from 'react';
import {View, Text, Image, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Button, Forminput} from '../../components';
import {Metrix, Images, Utils, Constants} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    emailErrMsg: '',
    passErrMsg: '',
    userErrMsg: '',
    validEmail: true,
    validPass: true,
    validUser: true,
  };

  signUp = () => {
    const {
      email,
      password,
      username,
      validEmail,
      validUser,
      validPass,
    } = this.state;
    const {signUp} = this.props;
    if (!email) this.setState({emailErrMsg: 'Email is a required field'});
    if (!username) this.setState({userErrMsg: 'Username is a required field'});
    if (!password) this.setState({passErrMsg: 'Password is a required field'});
    else if (!validEmail)
      this.setState({emailErrMsg: 'Please enter valid email address.'});
    else if (!validUser)
      this.setState({userErrMsg: 'Please enter valid username'});
    else if (!validPass) this.setState({passErrMsg: 'Password is not valid'});
    else signUp({email, username, password});
  };

  validateEmail = email => {
    let validEmail = Utils.isEmailValid(email);
    this.setState({email, validEmail, emailErrMsg: ''});
  };
  validateUsername = username => {
    let validUser = Utils.isFullNameValid(username);
    this.setState({username, validUser, userErrMsg: ''});
  };

  validatePass = password => {
    let validPass = Utils.isPasswordValid(password);
    this.setState({password, validPass, passErrMsg: ''});
  };

  render() {
    const {
      email,
      password,
      username,
      userErrMsg,
      emailErrMsg,
      passErrMsg,
    } = this.state;
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
            <Text style={styles.headingStyle}>Sign Up</Text>
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
                this.userInputRef.focus();
              }}
            />
            <Forminput.TextField
              placeholder="Username"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={this.validateUsername}
              errMsg={userErrMsg}
              value={username}
              blurOnSubmit={false}
              reference={ref => {
                this.userInputRef = ref;
              }}
              containerStyle={{marginTop: Metrix.VerticalSize(15)}}
              onSubmitEditing={() => {
                this.passInputRef.focus();
              }}
            />

            <Forminput.TextField
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={this.validatePass}
              errMsg={passErrMsg}
              value={password}
              reference={ref => {
                this.passInputRef = ref;
              }}
              containerStyle={{marginTop: Metrix.VerticalSize(15)}}
              onSubmitEditing={this.signUp}
            />

            <Button.Standard
              text="Create Account"
              isLoading={this.props.loading}
              disabled={this.props.loading}
              onPress={() => this.signUp()}
              containerStyle={{marginTop: Metrix.VerticalSize(35)}}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: payload => {
      dispatch(AppAction.SignUp(payload));
    },
  };
}

function mapStateToProps(state) {
  return {
    loading: state.AppReducer.loader,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
