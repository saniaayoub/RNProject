import React, {Component} from 'react';
import {View, Text, Image, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Button, Forminput} from '../../components';
import {Metrix, Images, Utils, Constants} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';
import {NavigationService} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';

class ForgotPass extends Component {
  state = {
    email: '',
    emailErrMsg: '',
    validEmail: true,
  };

  sendEmail = () => {
    const {email, validEmail} = this.state;
    const {sendEmail} = this.props;
    if (!email) this.setState({emailErrMsg: 'Email is a required field'});
    else if (!validEmail)
      this.setState({emailErrMsg: 'Please enter valid email address.'});
    else sendEmail(email);
    this.setState({
      email: '',
    });
    NavigationService.goBack();
  };

  validateEmail = email => {
    let validEmail = Utils.isEmailValid(email);
    this.setState({email, validEmail, emailErrMsg: ''});
  };

  signUp = () => {
    const {navigate} = NavigationService;
    navigate('SignUp');
  };
  render() {
    const {email, emailErrMsg} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          style={{width: '100%'}}>
          <View style={styles.content}>
            <View style={styles.iconView}>
              <Icon name="lock" color={'red'} size={Metrix.VerticalSize(100)} />
            </View>
            <Text style={styles.headingStyle}>Trouble Login In?</Text>
            <Text
              style={{
                marginTop: Metrix.VerticalSize(10),
                color: 'white',
                fontSize: Metrix.FontSmall,
              }}>
              Enter Your Email below
            </Text>
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

            <Button.Standard
              text="Send Email"
              isLoading={this.props.loading}
              disabled={this.props.loading}
              onPress={() => this.sendEmail()}
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
    sendEmail: payload => {
      dispatch(AppAction.SendEmail(payload));
    },
  };
}

function mapStateToProps(state) {
  return {
    loading: state.AppReducer.loader,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass);
