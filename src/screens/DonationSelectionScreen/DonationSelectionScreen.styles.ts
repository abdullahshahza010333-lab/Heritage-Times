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
    paddingVertical: RFValue(25),
  },
  header: {
    marginBottom: RFValue(30),
  },
  headerTitle: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: RFValue(8),
  },
  headerSubtitle: {
    fontSize: RFValue(14),
    color: Colors.textSecondary,
    lineHeight: RFValue(20),
  },
  adminLoginButton: {
    alignSelf: 'flex-start',
    marginTop: RFValue(12),
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: RFValue(20),
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(6),
    backgroundColor: Colors.backgroundAlt,
  },
  adminLoginButtonText: {
    fontSize: RFValue(12),
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  selectedAmountContainer: {
    backgroundColor: Colors.primaryLight,
    borderRadius: RFValue(12),
    padding: RFValue(16),
    marginBottom: RFValue(30),
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  selectedAmountLabel: {
    fontSize: RFValue(12),
    color: Colors.textSecondary,
    marginBottom: RFValue(4),
  },
  selectedAmount: {
    fontSize: RFValue(32),
    fontWeight: 'bold',
    color: Colors.primary,
  },
  presetsContainer: {
    marginBottom: RFValue(30),
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: RFValue(12),
  },
  presetsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: RFValue(12),
  },
  presetButton: {
    flex: 1,
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(10),
    backgroundColor: Colors.backgroundAlt,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  presetButtonText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  presetButtonTextActive: {
    color: Colors.white,
  },
  customAmountContainer: {
    marginBottom: RFValue(30),
  },
  customInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundAlt,
    borderRadius: RFValue(10),
    borderWidth: 2,
    borderColor: Colors.border,
    paddingHorizontal: RFValue(12),
    marginBottom: RFValue(12),
  },
  currencySymbol: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginRight: RFValue(4),
  },
  customInput: {
    flex: 1,
    paddingVertical: RFValue(12),
    fontSize: RFValue(16),
    color: Colors.textPrimary,
  },
  customAmountButton: {
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    backgroundColor: Colors.primaryLight,
    borderRadius: RFValue(8),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  customAmountButtonText: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: Colors.primary,
  },
  continueButton: {
    paddingVertical: RFValue(14),
    paddingHorizontal: RFValue(20),
    backgroundColor: Colors.primary,
    borderRadius: RFValue(10),
    alignItems: 'center',
    marginTop: RFValue(10),
    marginBottom: RFValue(20),
  },
  continueButtonDisabled: {
    backgroundColor: Colors.gray400,
  },
  continueButtonText: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.white,
  },
});

export default styles;
