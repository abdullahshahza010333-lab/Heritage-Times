import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './CashPaymentScreen.styles';
import type { RootStackParamList } from '../../navigation/types';
import {
  fetchEmployees,
  saveCashCollection,
  type EmployeeOption,
} from '../../services/cashCollectionService';

type Props = NativeStackScreenProps<RootStackParamList, 'CashPayment'>;

const CashPaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { amount, donorEmail } = route.params;
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [isSavingCollection, setIsSavingCollection] = useState(false);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setIsLoadingEmployees(true);
        const list = await fetchEmployees();
        setEmployees(list);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn('Unable to load employees:', errorMessage);
        Alert.alert('Employees Not Loaded', 'Could not load employee names. Please try again.');
      } finally {
        setIsLoadingEmployees(false);
      }
    };

    loadEmployees();
  }, []);

  const selectedEmployee = useMemo(
    () => employees.find(item => item.id === selectedEmployeeId) ?? null,
    [employees, selectedEmployeeId],
  );

  const handleConfirm = async () => {
    if (!selectedEmployee) {
      Alert.alert('Collector Required', 'Please select who is collecting the cash payment.');
      return;
    }

    try {
      setIsSavingCollection(true);
      const cashCollectionId = await saveCashCollection({
        amount,
        collectorId: selectedEmployee.id,
        collectorName: selectedEmployee.name,
        donorEmail,
      });

      navigation.navigate('Success', {
        amount,
        method: 'Cash',
        collectorName: selectedEmployee.name,
        cashCollectionId,
        donorEmail,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn('Unable to save cash collection:', errorMessage);
      Alert.alert('Save Failed', 'Could not save cash collection. Please try again.');
    } finally {
      setIsSavingCollection(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cash Confirmation</Text>
        <Text style={styles.headerSubtitle}>
          A team member will collect your donation
        </Text>
      </View>

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Cash Amount</Text>
        <Text style={styles.amountValue}>${amount.toFixed(2)}</Text>
      </View>

      <View style={styles.collectorContainer}>
        <Text style={styles.collectorTitle}>Who is collecting this cash?</Text>

        {isLoadingEmployees ? (
          <View style={styles.loadingEmployeesContainer}>
            <ActivityIndicator />
            <Text style={styles.loadingEmployeesText}>Loading employees...</Text>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setIsDropdownOpen(prev => !prev)}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedEmployee ? selectedEmployee.name : 'Select employee'}
              </Text>
              <Text style={styles.dropdownArrow}>{isDropdownOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {isDropdownOpen ? (
              <View style={styles.employeeList}>
                {employees.map(employee => {
                  const isSelected = selectedEmployeeId === employee.id;

                  return (
                    <TouchableOpacity
                      key={employee.id}
                      style={[
                        styles.employeeOption,
                        isSelected && styles.employeeOptionSelected,
                      ]}
                      onPress={() => {
                        setSelectedEmployeeId(employee.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.employeeOptionText,
                          isSelected && styles.employeeOptionTextSelected,
                        ]}
                      >
                        {employee.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
        )}
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          (isSavingCollection || !selectedEmployee) && styles.confirmButtonDisabled,
        ]}
        onPress={handleConfirm}
        disabled={isSavingCollection || !selectedEmployee}>
        {isSavingCollection ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.confirmButtonText}>Confirm Cash Received</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CashPaymentScreen;
