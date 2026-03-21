import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './PaymentMethodScreen.styles';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentMethod'>;

const PaymentMethodScreen: React.FC<Props> = ({ route, navigation }) => {
  const { amount, donorEmail: initialDonorEmail } = route.params;
  const [donorEmail, setDonorEmail] = useState(initialDonorEmail ?? '');

  const handlePaymentMethod = (method: 'cash' | 'card') => {
    const normalizedEmail = donorEmail.trim();

    if (method === 'cash') {
      navigation.navigate('CashPayment', {
        amount,
        donorEmail: normalizedEmail || undefined,
      });
    } else {
      navigation.navigate('CardPayment', {
        amount,
        donorEmail: normalizedEmail || undefined,
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Payment Method</Text>
        <Text style={styles.headerSubtitle}>
          Choose how you would like to pay
        </Text>
      </View>

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Donation Amount</Text>
        <Text style={styles.amountValue}>${amount.toFixed(2)}</Text>
      </View>

      <View style={styles.emailContainer}>
        <Text style={styles.emailLabel}>Email (optional)</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="Enter email"
          keyboardType="email-address"
          inputMode="email"
          autoCapitalize="none"
          autoCorrect={false}
          value={donorEmail}
          onChangeText={setDonorEmail}
        />
        <Text style={styles.emailNote}>
          On provided mail, you will get receipt.
        </Text>
      </View>

      {/* Payment Options */}
      <View style={styles.paymentOptionsContainer}>
        {/* Cash Option */}
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => handlePaymentMethod('cash')}>
          <View style={styles.paymentIconContainer}>
            <Text style={styles.paymentIcon}>💵</Text>
          </View>
          <View style={styles.paymentTextContainer}>
            <Text style={styles.paymentMethodTitle}>Cash</Text>
            <Text style={styles.paymentMethodDescription}>
              Pay with cash in person
            </Text>
          </View>
          <Text style={styles.paymentArrow}>›</Text>
        </TouchableOpacity>

        {/* Card Option */}
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => handlePaymentMethod('card')}>
          <View style={styles.paymentIconContainer}>
            <Text style={styles.paymentIcon}>💳</Text>
          </View>
          <View style={styles.paymentTextContainer}>
            <Text style={styles.paymentMethodTitle}>Card</Text>
            <Text style={styles.paymentMethodDescription}>
              Pay with Square Tap to Pay
            </Text>
          </View>
          <Text style={styles.paymentArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Security Info */}
      <View style={styles.securityContainer}>
        <Text style={styles.securityIcon}>🔒</Text>
        <Text style={styles.securityText}>
          Your payment information is secure and encrypted
        </Text>
      </View>
    </ScrollView>
  );
};

export default PaymentMethodScreen;
