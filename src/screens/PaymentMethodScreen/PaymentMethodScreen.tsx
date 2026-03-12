import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './PaymentMethodScreen.styles';

type RootStackParamList = {
  PaymentMethod: { amount: number };
  CardPayment: { amount: number };
  Success: { amount: number; method: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentMethod'>;

const PaymentMethodScreen: React.FC<Props> = ({ route, navigation }) => {
  const { amount } = route.params;

  const handlePaymentMethod = (method: 'cash' | 'card') => {
    if (method === 'cash') {
      navigation.navigate('Success', { amount, method: 'Cash' });
    } else {
      navigation.navigate('CardPayment', { amount });
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
