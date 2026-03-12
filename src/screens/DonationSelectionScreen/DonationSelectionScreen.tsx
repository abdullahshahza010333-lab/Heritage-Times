import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './DonationSelectionScreen.styles';
import Colors from '../../config/colors';
import { DONATION_PRESET_AMOUNTS } from '../../config/donationAmounts';

type RootStackParamList = {
  DonationSelection: undefined;
  PaymentMethod: { amount: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'DonationSelection'>;

interface DonationItem {
  id: string;
  amount: number;
}

const DonationSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const customAmountInputRef = useRef<TextInput>(null);

  const presets: DonationItem[] = DONATION_PRESET_AMOUNTS.map((amount, index) => ({
    id: `${index + 1}`,
    amount,
  }));

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

          <TouchableOpacity
            style={[
              styles.presetButton,
              isOtherSelected && styles.presetButtonActive,
            ]}
            onPress={handleSelectOther}>
            <Text
              style={[
                styles.presetButtonText,
                isOtherSelected && styles.presetButtonTextActive,
              ]}>
              Other
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
