import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: -1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
});

export default styles;
