import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Colors, Metrix} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const FloatingButton = props => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={Metrix.ActiveOpacity}
        {...props}
        style={[props.customStyle, styles.floatingButtonView]}>
        {props.iconComp || <Icon name="plus" color={Colors.Text} size={18} />}
      </TouchableOpacity>
    </>
  );
};

export default React.memo(FloatingButton);
