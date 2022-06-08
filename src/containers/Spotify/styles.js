import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Secondary,
  },
  content: {
    position: 'relative',
    top: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 120,
  },
  itemView: {
    flexGrow: 1,
    borderRadius: Metrix.Radius,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: Colors.Text,
    padding: Metrix.HorizontalSize(15),
    width: Metrix.HorizontalSize(320),
  },
  title: {
    paddingLeft: Metrix.HorizontalSize(5),
    color: 'black',
    textTransform: 'capitalize',
    fontFamily: Fonts['Montserrat-Bold'],
  },
  bodyText: {
    paddingLeft: Metrix.HorizontalSize(5),
    color: 'black',
    marginTop: 5,
    fontFamily: Fonts['Montserrat-Regular'],
  },
});

export default styles;
