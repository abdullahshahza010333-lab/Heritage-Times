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
import styles from './CardPaymentScreen.styles';
import Colors from '../../config/colors';

type RootStackParamList = {
  CardPayment: { amount: number };
  Processing: { amount: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'CardPayment'>;

const CardPaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { amount } = route.params;
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      setExpiryDate(`${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`);
    } else {
      setExpiryDate(cleaned);
    }
  };

  const handlePayment = () => {
    // Validation
    if (!cardName.trim()) {
      Alert.alert('Missing Information', 'Please enter cardholder name');
      return;
    }
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      Alert.alert('Invalid Card', 'Please enter a valid 16-digit card number');
      return;
    }
    if (expiryDate.length !== 5) {
      Alert.alert('Invalid Expiry', 'Please enter a valid expiry date (MM/YY)');
      return;
    }
    if (cvv.length !== 3) {
      Alert.alert('Invalid CVV', 'Please enter a valid 3-digit CVV');
      return;
    }

    // Navigate to processing
    navigation.navigate('Processing', { amount });
  };

  const isFormValid =
    cardName.trim().length > 0 &&
    cardNumber.replace(/\s/g, '').length === 16 &&
    expiryDate.length === 5 &&
    cvv.length === 3;

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Card Payment</Text>
        <Text style={styles.headerSubtitle}>
          Enter your card details securely
        </Text>
      </View>

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Donation Amount</Text>
        <Text style={styles.amountValue}>${amount.toFixed(2)}</Text>
      </View>

      {/* Card Preview */}
      <View style={styles.cardPreview}>
        <Text style={styles.cardChip}>💳</Text>
        <Text style={styles.cardNumber}>
          {cardNumber || '•••• •••• •••• ••••'}
        </Text>
        <View style={styles.cardDetails}>
          <View style={styles.cardDetailItem}>
            <Text style={styles.cardDetailLabel}>Cardholder</Text>
            <Text style={styles.cardDetailValue}>
              {cardName || 'Your Name'}
            </Text>
          </View>
          <View style={styles.cardDetailItem}>
            <Text style={styles.cardDetailLabel}>Expires</Text>
            <Text style={styles.cardDetailValue}>
              {expiryDate || 'MM/YY'}
            </Text>
          </View>
        </View>
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        {/* Cardholder Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Cardholder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor={Colors.gray500}
            value={cardName}
            onChangeText={setCardName}
          />
        </View>

        {/* Card Number */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            placeholderTextColor={Colors.gray500}
            maxLength={19}
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={formatCardNumber}
          />
        </View>

        {/* Expiry and CVV */}
        <View style={styles.rowContainer}>
          <View style={[styles.formGroup, styles.flex1]}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              placeholderTextColor={Colors.gray500}
              maxLength={5}
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={formatExpiryDate}
            />
          </View>

          <View style={[styles.formGroup, styles.flex1]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              placeholderTextColor={Colors.gray500}
              maxLength={3}
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>
      </View>

      {/* Security Info */}
      <View style={styles.securityContainer}>
        <Text style={styles.securityIcon}>🔒</Text>
        <Text style={styles.securityText}>
          Your card details are encrypted and secure
        </Text>
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        style={[
          styles.payButton,
          !isFormValid && styles.payButtonDisabled,
        ]}
        onPress={handlePayment}
        disabled={!isFormValid}>
        <Text style={styles.payButtonText}>
          Pay ${amount.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CardPaymentScreen;
