import React, { useState } from 'react';
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

  const presets: DonationItem[] = [
    { id: '1', amount: 5 },
    { id: '2', amount: 7 },
    { id: '3', amount: 10 },
  ];

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = () => {
    if (!customAmount || isNaN(Number(customAmount)) || Number(customAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid donation amount');
      return;
    }
    setSelectedAmount(Number(customAmount));
    setCustomAmount('');
  };

  const handleContinue = () => {
    if (selectedAmount === null || selectedAmount <= 0) {
      Alert.alert('No Amount Selected', 'Please select a donation amount');
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
          Choose a preset amount or enter a custom amount
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
        </View>
      </View>

      {/* Custom Amount Section */}
      <View style={styles.customAmountContainer}>
        <Text style={styles.sectionTitle}>Custom Amount</Text>
        <View style={styles.customInputGroup}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.customInput}
            placeholder="0.00"
            placeholderTextColor={Colors.gray500}
            keyboardType="decimal-pad"
            value={customAmount}
            onChangeText={setCustomAmount}
            editable={true}
          />
        </View>
        <TouchableOpacity
          style={styles.customAmountButton}
          onPress={handleCustomAmount}
          disabled={!customAmount}>
          <Text style={styles.customAmountButtonText}>Set Amount</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedAmount === null && styles.continueButtonDisabled,
        ]}
        onPress={handleContinue}
        disabled={selectedAmount === null}>
        <Text style={styles.continueButtonText}>Continue to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DonationSelectionScreen;
