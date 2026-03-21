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
  },
  amountContainer: {
    backgroundColor: Colors.primaryLight,
    borderRadius: RFValue(12),
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(20),
    marginBottom: RFValue(30),
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
  paymentOptionsContainer: {
    gap: RFValue(16),
    marginBottom: RFValue(30),
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundAlt,
    borderRadius: RFValue(12),
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(16),
    borderWidth: 2,
    borderColor: Colors.border,
  },
  paymentIconContainer: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(10),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(12),
  },
  paymentIcon: {
    fontSize: RFValue(28),
  },
  paymentTextContainer: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: RFValue(4),
  },
  paymentMethodDescription: {
    fontSize: RFValue(13),
    color: Colors.textSecondary,
  },
  paymentArrow: {
    fontSize: RFValue(24),
    color: Colors.textSecondary,
  },
  securityContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.gray200,
    borderRadius: RFValue(10),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(16),
    alignItems: 'center',
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
});

export default styles;
