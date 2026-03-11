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
  instructionsContainer: {
    marginBottom: RFValue(25),
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: RFValue(16),
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: RFValue(16),
  },
  stepNumber: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(12),
  },
  stepNumberText: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: Colors.white,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: RFValue(4),
  },
  stepDescription: {
    fontSize: RFValue(13),
    color: Colors.textSecondary,
    lineHeight: RFValue(18),
  },
  detailsContainer: {
    backgroundColor: Colors.backgroundAlt,
    borderRadius: RFValue(12),
    padding: RFValue(16),
    marginBottom: RFValue(25),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RFValue(8),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailRow_last: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: RFValue(13),
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  confirmButton: {
    paddingVertical: RFValue(14),
    paddingHorizontal: RFValue(20),
    backgroundColor: Colors.success,
    borderRadius: RFValue(10),
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  confirmButtonText: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.white,
  },
});

export default styles;
