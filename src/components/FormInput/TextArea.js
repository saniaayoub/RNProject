import React from 'react';
import {Text, TextInput, View, TextInputProps} from 'react-native';
import {Colors, Metrix} from '../../config';
import styles from './styles';

const TextArea = props => {
  return (
    <>
      <View style={props.containerStyle}>
        <TextInput
          style={[
            {
              ...styles.inputStyle,
              height: Metrix.VerticalSize(150),
              textAlignVertical: 'top',
            },
            props.inputStyle,
          ]}
          ref={r => props.reference(r)}
          onKeyPress={e => props.onKeyPressEvent(e.nativeEvent.key)}
          {...props}
        />
        {props.errMsg ? (
          <Text style={styles.errMsgStyle}>{props.errMsg}</Text>
        ) : null}
      </View>
    </>
  );
};

export default React.memo(TextArea);
