import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  listContentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 120,
  },
  itemView: {
    borderRadius: Metrix.Radius,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: Colors.DarkGray,
    padding: Metrix.HorizontalSize(15),
  },
  title: {
    color: Colors.Text,
    marginVertical: 5,
    textTransform: 'capitalize',
    fontFamily: Fonts['Montserrat-Bold'],
  },
  bodyText: {
    color: Colors.Text,
    marginTop: 5,
    fontFamily: Fonts['Montserrat-Regular'],
  },
});

export default styles;
