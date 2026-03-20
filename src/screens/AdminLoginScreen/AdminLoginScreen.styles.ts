import { StyleSheet } from 'react-native';
import { moderateScale as RFValue } from 'react-native-size-matters';
import Colors from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(24),
  },
  header: {
    marginBottom: RFValue(20),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: RFValue(8),
  },
  subtitle: {
    fontSize: RFValue(14),
    color: Colors.textSecondary,
    lineHeight: RFValue(20),
  },
  formCard: {
    backgroundColor: Colors.backgroundAlt,
    borderRadius: RFValue(12),
    borderColor: Colors.border,
    borderWidth: 1,
    padding: RFValue(16),
  },
  label: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: RFValue(8),
    marginTop: RFValue(8),
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: RFValue(10),
    backgroundColor: Colors.white,
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(11),
    fontSize: RFValue(15),
    color: Colors.textPrimary,
  },
  loginButton: {
    marginTop: RFValue(18),
    backgroundColor: Colors.primary,
    borderRadius: RFValue(10),
    alignItems: 'center',
    paddingVertical: RFValue(13),
  },
  loginButtonDisabled: {
    backgroundColor: Colors.gray500,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: RFValue(16),
    fontWeight: '700',
  },
});

export default styles;
