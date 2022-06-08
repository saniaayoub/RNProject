import {StyleSheet} from 'react-native';
import {Colors} from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});

export default styles;
