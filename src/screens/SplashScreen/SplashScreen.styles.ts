import { StyleSheet } from 'react-native';
import { moderateScale as RFValue } from 'react-native-size-matters';
import Colors from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RFValue(50),
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: RFValue(36),
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: RFValue(10),
  },
  subtitle: {
    fontSize: RFValue(16),
    color: Colors.textInverse,
    fontWeight: '500',
  },
  loaderContainer: {
    marginBottom: RFValue(30),
  },
});

export default styles;
