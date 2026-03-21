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
    marginBottom: RFValue(25),
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
  },
  amountContainer: {
    backgroundColor: Colors.primaryLight,
    borderRadius: RFValue(12),
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(20),
    marginBottom: RFValue(25),
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  amountLabel: {
    fontSize: RFValue(12),
    color: Colors.textSecondary,
    marginBottom: RFValue(4),
  },
  amountValue: {
    fontSize: RFValue(32),
    fontWeight: 'bold',
    color: Colors.primary,
  },
  emailContainer: {
    marginBottom: RFValue(20),
  },
  emailLabel: {
    fontSize: RFValue(13),
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: RFValue(7),
  },
  emailInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundAlt,
    borderRadius: RFValue(10),
    paddingVertical: RFValue(11),
    paddingHorizontal: RFValue(12),
    fontSize: RFValue(14),
    color: Colors.textPrimary,
  },
  emailNote: {
    marginTop: RFValue(7),
    fontSize: RFValue(12),
    color: Colors.textSecondary,
  },
  cardPreview: {
    backgroundColor: Colors.primary,
    borderRadius: RFValue(16),
    padding: RFValue(20),
    marginBottom: RFValue(30),
    justifyContent: 'space-between',
  },
  cardChip: {
    fontSize: RFValue(32),
    marginBottom: RFValue(12),
  },
  cardNumber: {
    fontSize: RFValue(18),
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: RFValue(2),
    marginBottom: RFValue(16),
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetailItem: {
    flex: 1,
  },
  cardDetailLabel: {
    fontSize: RFValue(10),
    color: Colors.gray400,
    marginBottom: RFValue(2),
  },
  cardDetailValue: {
    fontSize: RFValue(12),
    color: Colors.white,
    fontWeight: '600',
  },
  formContainer: {
    marginBottom: RFValue(25),
  },
  formGroup: {
    marginBottom: RFValue(16),
  },
  label: {
    fontSize: RFValue(13),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: RFValue(8),
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: RFValue(10),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(14),
    fontSize: RFValue(14),
    color: Colors.textPrimary,
    backgroundColor: Colors.backgroundAlt,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: RFValue(12),
  },
  flex1: {
    flex: 1,
  },
  securityContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.gray200,
    borderRadius: RFValue(10),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    alignItems: 'center',
    marginBottom: RFValue(25),
  },
  securityIcon: {
    fontSize: RFValue(20),
    marginRight: RFValue(10),
  },
  securityText: {
    fontSize: RFValue(13),
    color: Colors.textSecondary,
    flex: 1,
  },
  payButton: {
    paddingVertical: RFValue(14),
    paddingHorizontal: RFValue(20),
    backgroundColor: Colors.success,
    borderRadius: RFValue(10),
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  payButtonLoading: {
    opacity: 0.7,
  },
  payButtonDisabled: {
    backgroundColor: Colors.gray400,
  },
  payButtonText: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.white,
  },
});

export default styles;
