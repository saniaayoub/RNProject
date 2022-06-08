import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ViewPropTypes,
  TextProps,
  TextPropTypes,
} from 'react-native';
import {Metrix} from '../../config';
import Loader from '../Loader';
import styles from './styles';

const Standard = props => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={Metrix.ActiveOpacity}
        {...props}
        style={[styles.standardView, props.containerStyle]}>
        {props.isLoading ? (
          <Loader />
        ) : (
          <Text style={[styles.textStyle, props.textStyle]}>{props.text}</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

export default React.memo(Standard);
