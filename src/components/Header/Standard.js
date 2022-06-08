import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../config';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';

const Standard = ({
  Heading,
  leftIconName,
  leftIconComp,
  onPressLeft,
  rightIconName,
  rightIconComp,
  onPressRight,
}) => (
  <View style={styles.mainView}>
    {onPressLeft && (
      <TouchableOpacity onPress={onPressLeft} style={styles.iconView}>
        {leftIconComp || (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'grey',
              borderRadius: 30 / 2,
              width: 30,
              height: 30,
            }}>
            <Icon name={leftIconName} color={Colors.Text} size={26} />
          </View>
        )}
      </TouchableOpacity>
    )}

    <Text style={styles.headingStyle}>{Heading}</Text>

    <TouchableOpacity onPress={onPressRight} style={styles.iconView}>
      {rightIconComp || rightIconName ? (
        <Icon name={rightIconName} color={Colors.Text} size={26} />
      ) : (
        <View style={styles.dummyView} />
      )}
    </TouchableOpacity>
  </View>
);

export default React.memo(Standard);
