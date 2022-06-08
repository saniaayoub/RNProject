import React from 'react';
import {TextInput, View, Text, TextInputProps} from 'react-native';
import {Colors} from '../../config';
import styles from './styles';

const TextField = props => {
  return (
    <>
      <View style={props.containerStyle}>
        <TextInput
          style={[
            styles.inputStyle,
            props.inputStyle,
            {borderColor: props.errMsg ? Colors.Danger : Colors.Primary},
          ]}
          onKeyPress={e => props.onKeyPressEvent(e.nativeEvent.key)}
          {...props}
          placeholderTextColor={'grey'}
        />
        {props.errMsg ? (
          <Text style={styles.errMsgStyle}>{props.errMsg}</Text>
        ) : null}
      </View>
    </>
  );
};

export default React.memo(TextField);
