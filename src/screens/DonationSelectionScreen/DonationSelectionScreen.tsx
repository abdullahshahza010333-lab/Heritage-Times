import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import styles from './DonationSelectionScreen.styles';
import Colors from '../../config/colors';
import { DONATION_PRESET_AMOUNTS } from '../../config/donationAmounts';
import {
  fetchDonationAmounts,
  type DonationAmount,
  updateDonationAmounts,
} from '../../services/donationService';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DonationSelection'>;

const FALLBACK_PRESETS: DonationAmount[] = DONATION_PRESET_AMOUNTS.map((amount, index) => ({
  id: `preset-${index + 1}`,
  amount,
}));

const DonationSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [presets, setPresets] = useState<DonationAmount[]>(FALLBACK_PRESETS);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isLoadingPresets, setIsLoadingPresets] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isEditingAmounts, setIsEditingAmounts] = useState(false);
  const [isSavingAmounts, setIsSavingAmounts] = useState(false);
  const [editableAmounts, setEditableAmounts] = useState<Record<string, string>>({});
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);
  const customAmountInputRef = useRef<TextInput>(null);

  const loadDonationAmounts = useCallback(async (showAlertOnFailure: boolean = true) => {
    try {
      setIsLoadingPresets(true);
      setLoadErrorMessage(null);
      const firebasePresets = await fetchDonationAmounts();
      if (firebasePresets.length > 0) {
        setPresets(firebasePresets);
      } else {
        setPresets(FALLBACK_PRESETS);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      console.warn('Unable to fetch donation amounts from Firestore:', errorMessage);
      setPresets(FALLBACK_PRESETS);
      setLoadErrorMessage(
        'Donation amounts could not be loaded from Firebase. Tap retry to try again.',
      );

      if (showAlertOnFailure) {
        Alert.alert(
          'Using Default Amounts',
          'Donation amounts could not be loaded from Firebase. Default values are shown.',
        );
      }
    } finally {
      setIsLoadingPresets(false);
    }
  }, []);

  useEffect(() => {
    loadDonationAmounts();

    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsAdminLoggedIn(Boolean(user));
      setAdminEmail(user?.email ?? null);
      if (!user) {
        setIsEditingAmounts(false);
        setEditableAmounts({});
      }
    });

    return unsubscribe;
  }, [loadDonationAmounts]);

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount);
    setIsOtherSelected(false);
    setCustomAmount('');
  };

  const handleSelectOther = () => {
    setIsOtherSelected(true);
    setSelectedAmount(null);
    setTimeout(() => {
      customAmountInputRef.current?.focus();
    }, 50);
  };

  const handleCustomAmountChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    setCustomAmount(sanitizedValue);

    if (!sanitizedValue) {
      setSelectedAmount(null);
      return;
    }

    const parsedAmount = Number(sanitizedValue);
    setSelectedAmount(parsedAmount > 0 ? parsedAmount : null);
  };

  const handleToggleEditAmounts = () => {
    if (isEditingAmounts) {
      setIsEditingAmounts(false);
      setEditableAmounts({});
      return;
    }

    const initialValues: Record<string, string> = {};
    presets.forEach(item => {
      initialValues[item.id] = String(item.amount);
    });

    setEditableAmounts(initialValues);
    setIsEditingAmounts(true);
  };

  const handleEditableAmountChange = (id: string, value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    setEditableAmounts(prev => ({
      ...prev,
      [id]: sanitizedValue,
    }));
  };

  const handleSaveAmounts = async () => {
    if (!isAdminLoggedIn) {
      Alert.alert('Admin Login Required', 'Only logged-in admins can update donation amounts.');
      return;
    }

    const updatedAmounts: DonationAmount[] = [];

    for (const item of presets) {
      const rawValue = editableAmounts[item.id] ?? '';
      const amount = Number(rawValue);
      if (!rawValue || !Number.isFinite(amount) || amount <= 0) {
        Alert.alert('Invalid Amount', 'Each donation amount must be a number greater than 0.');
        return;
      }

      updatedAmounts.push({
        id: item.id,
        amount,
      });
    }

    try {
      setIsSavingAmounts(true);
      await updateDonationAmounts(updatedAmounts);
      const sortedUpdatedAmounts = [...updatedAmounts].sort((a, b) => a.amount - b.amount);
      setPresets(sortedUpdatedAmounts);
      setIsEditingAmounts(false);
      setEditableAmounts({});
      Alert.alert('Updated', 'Donation amounts have been saved to Firebase.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn('Unable to update donation amounts:', errorMessage);

      if (errorMessage.includes('auth-required')) {
        Alert.alert('Admin Login Required', 'Only logged-in admins can update donation amounts.');
        return;
      }

      Alert.alert('Update Failed', 'Donation amounts could not be updated. Please try again.');
    } finally {
      setIsSavingAmounts(false);
    }
  };

  const handleSwitchToSimpleUser = async () => {
    try {
      await auth().signOut();
      setIsEditingAmounts(false);
      setEditableAmounts({});
      Alert.alert('Switched', 'You are now using the app as a simple user.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn('Unable to switch to simple user:', errorMessage);
      Alert.alert('Sign Out Failed', 'Could not switch to simple user. Please try again.');
    }
  };

  const handleContinue = () => {
    if (isOtherSelected && (!customAmount || Number(customAmount) <= 0)) {
      Alert.alert('Invalid Amount', 'Please enter a valid donation amount');
      return;
    }

    if (selectedAmount === null || selectedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid donation amount');
      return;
    }

    navigation.navigate('PaymentMethod', { amount: selectedAmount });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Donation Amount</Text>
        <Text style={styles.headerSubtitle}>
          Choose one of the quick amounts or Other
        </Text>
        {isAdminLoggedIn ? (
          <View style={styles.adminStatusRow}>
            <View style={styles.adminStatusBadge}>
              <View style={styles.adminStatusDot} />
              <Text style={styles.adminStatusText}>Logged in as admin</Text>
            </View>
            <TouchableOpacity
              style={styles.simpleUserButton}
              onPress={handleSwitchToSimpleUser}
            >
              <Text style={styles.simpleUserButtonText}>Switch to Simple User</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.adminLoginButton}
            onPress={() => navigation.navigate('AdminLogin')}
          >
            <Text style={styles.adminLoginButtonText}>Admin Login</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Display Selected Amount */}
      {selectedAmount && (
        <View style={styles.selectedAmountContainer}>
          <Text style={styles.selectedAmountLabel}>Selected Amount:</Text>
          <Text style={styles.selectedAmount}>${selectedAmount.toFixed(2)}</Text>
        </View>
      )}

      {/* Preset Amount Buttons */}
      <View style={styles.presetsContainer}>
        <Text style={styles.sectionTitle}>Quick Donate</Text>
        {isLoadingPresets ? (
          <View style={styles.loadingPresetsContainer}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={styles.loadingPresetsText}>Loading donation amounts...</Text>
          </View>
        ) : null}
        {!isLoadingPresets && loadErrorMessage ? (
          <View style={styles.firebaseErrorContainer}>
            <Text style={styles.firebaseErrorText}>{loadErrorMessage}</Text>
            <TouchableOpacity
              style={styles.retryFirebaseButton}
              onPress={() => loadDonationAmounts()}
            >
              <Text style={styles.retryFirebaseButtonText}>Retry Firebase</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.presetsGrid}>
          {presets.map(preset => (
            <TouchableOpacity
              key={preset.id}
              style={[
                styles.presetButton,
                selectedAmount === preset.amount &&
                  styles.presetButtonActive,
              ]}
              onPress={() => handleSelectPreset(preset.amount)}>
              <Text
                style={[
                  styles.presetButtonText,
                  selectedAmount === preset.amount &&
                    styles.presetButtonTextActive,
                ]}>
                ${preset.amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isAdminLoggedIn && (
        <View style={styles.adminPanelContainer}>
          <View style={styles.adminPanelHeaderRow}>
            <View>
              <Text style={styles.adminPanelTitle}>Admin Management</Text>
              <Text style={styles.adminPanelSubtitle}>
                Logged in as {adminEmail ?? 'admin'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.adminEditButton}
              onPress={handleToggleEditAmounts}
              disabled={isSavingAmounts}
            >
              <Text style={styles.adminEditButtonText}>
                {isEditingAmounts ? 'Cancel' : 'Edit Amounts'}
              </Text>
            </TouchableOpacity>
          </View>

          {isEditingAmounts && (
            <View style={styles.adminEditorContainer}>
              {presets.map((item, index) => (
                <View key={item.id} style={styles.adminEditorRow}>
                  <Text style={styles.adminEditorLabel}>Amount {index + 1}</Text>
                  <View style={styles.adminEditorInputContainer}>
                    <Text style={styles.adminEditorCurrencySymbol}>$</Text>
                    <TextInput
                      style={styles.adminEditorInput}
                      keyboardType="number-pad"
                      inputMode="numeric"
                      value={editableAmounts[item.id] ?? ''}
                      onChangeText={value => handleEditableAmountChange(item.id, value)}
                      placeholder="0"
                      placeholderTextColor={Colors.gray500}
                    />
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={[
                  styles.adminSaveButton,
                  isSavingAmounts && styles.adminSaveButtonDisabled,
                ]}
                onPress={handleSaveAmounts}
                disabled={isSavingAmounts}
              >
                {isSavingAmounts ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <Text style={styles.adminSaveButtonText}>Save to Firebase</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Custom Amount Section */}
      {isOtherSelected && (
        <View style={styles.customAmountContainer}>
          <Text style={styles.sectionTitle}>Other Amount</Text>
          <View style={styles.customInputGroup}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              ref={customAmountInputRef}
              style={styles.customInput}
              placeholder="0"
              placeholderTextColor={Colors.gray500}
              keyboardType="number-pad"
              inputMode="numeric"
              value={customAmount}
              onChangeText={handleCustomAmountChange}
              editable={true}
              autoFocus
            />
          </View>
        </View>
      )}

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          (selectedAmount === null || selectedAmount <= 0) &&
            styles.continueButtonDisabled,
        ]}
        onPress={handleContinue}
        disabled={selectedAmount === null || selectedAmount <= 0}>
        <Text style={styles.continueButtonText}>Continue to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DonationSelectionScreen;
