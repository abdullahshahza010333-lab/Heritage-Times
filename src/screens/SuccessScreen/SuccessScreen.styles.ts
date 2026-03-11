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
    alignItems: 'center',
  },
  successIconContainer: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(50),
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFValue(25),
  },
  successIcon: {
    fontSize: RFValue(50),
    color: Colors.white,
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: RFValue(28),
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: RFValue(10),
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: RFValue(14),
    color: Colors.textSecondary,
    marginBottom: RFValue(30),
    textAlign: 'center',
  },
  receiptContainer: {
    width: '100%',
    backgroundColor: Colors.backgroundAlt,
    borderRadius: RFValue(12),
    padding: RFValue(20),
    marginBottom: RFValue(25),
    borderWidth: 2,
    borderColor: Colors.border,
  },
  receiptTitle: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: RFValue(16),
  },
  receiptContent: {
    gap: RFValue(12),
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RFValue(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  receiptLabel: {
    fontSize: RFValue(13),
    color: Colors.textSecondary,
  },
  receiptValue: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  messageContainer: {
    width: '100%',
    backgroundColor: Colors.primaryLight,
    borderRadius: RFValue(12),
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(16),
    alignItems: 'center',
    marginBottom: RFValue(25),
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  messageIcon: {
    fontSize: RFValue(28),
    marginBottom: RFValue(8),
  },
  messageText: {
    fontSize: RFValue(13),
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: RFValue(18),
  },
  primaryButton: {
    width: '100%',
    paddingVertical: RFValue(14),
    paddingHorizontal: RFValue(20),
    backgroundColor: Colors.primary,
    borderRadius: RFValue(10),
    alignItems: 'center',
    marginBottom: RFValue(12),
  },
  primaryButtonText: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.white,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: RFValue(14),
    paddingHorizontal: RFValue(20),
    backgroundColor: Colors.backgroundAlt,
    borderRadius: RFValue(10),
    alignItems: 'center',
    marginBottom: RFValue(25),
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.primary,
  },
  impactContainer: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: RFValue(12),
    padding: RFValue(16),
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  impactTitle: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.white,
    marginBottom: RFValue(8),
  },
  impactText: {
    fontSize: RFValue(13),
    color: Colors.textInverse,
    textAlign: 'center',
    lineHeight: RFValue(18),
  },
});

export default styles;
