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
  collectorContainer: {
    marginBottom: RFValue(24),
    backgroundColor: Colors.backgroundAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: RFValue(12),
    padding: RFValue(14),
  },
  collectorTitle: {
    fontSize: RFValue(14),
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: RFValue(10),
  },
  loadingEmployeesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(10),
  },
  loadingEmployeesText: {
    marginTop: RFValue(6),
    fontSize: RFValue(12),
    color: Colors.textSecondary,
  },
  employeeList: {
    marginTop: RFValue(8),
    gap: RFValue(8),
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    borderRadius: RFValue(8),
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    fontSize: RFValue(14),
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  dropdownArrow: {
    fontSize: RFValue(11),
    color: Colors.textSecondary,
  },
  employeeOption: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    borderRadius: RFValue(8),
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(12),
  },
  employeeOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  employeeOptionText: {
    fontSize: RFValue(14),
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  employeeOptionTextSelected: {
    color: Colors.primaryDark,
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
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmButtonText: {
    fontSize: RFValue(16),
    fontWeight: '600',
    color: Colors.white,
  },
});

export default styles;
