import { StyleSheet } from 'react-native';
import { moderateScale as RFValue } from 'react-native-size-matters';
import Colors from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFValue(20),
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  processingIconContainer: {
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(40),
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFValue(30),
  },
  processingIcon: {
    fontSize: RFValue(40),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: RFValue(10),
  },
  subtitle: {
    fontSize: RFValue(14),
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: RFValue(20),
    lineHeight: RFValue(20),
  },
  amount: {
    fontSize: RFValue(36),
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: RFValue(40),
  },
  loaderContainer: {
    marginBottom: RFValue(30),
  },
  statusMessage: {
    fontSize: RFValue(13),
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default styles;
