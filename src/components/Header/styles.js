import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: Metrix.HorizontalSize(10),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Metrix.VerticalSize(70),
  },
  iconView: {
    zIndex: 1000,
    paddingVertical: Metrix.HorizontalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingStyle: {
    letterSpacing: 0.63,
    fontSize: Metrix.FontMedium,
    fontFamily: Fonts['Montserrat-SemiBold'],
    color: 'white',
  },
  dummyView: {
    width: 26,
    height: 26,
  },
});

export default styles;
