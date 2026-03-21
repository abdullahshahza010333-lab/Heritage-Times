import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './CardPaymentScreen.styles';
import Colors from '../../config/colors';
import { initializePayment, payWithTap } from '../../services/paymentService';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CardPayment'>;

const CardPaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { amount, donorEmail } = route.params;
  const [loading, setLoading] = useState(false);

  const handleStartTapToPay = async () => {
    setLoading(true);
    try {
      const authorized = await initializePayment();

      if (!authorized) {
        Alert.alert('Error', 'Failed to initialize payment. Please try again.');
        return;
      }

      await payWithTap(amount);
      navigation.replace('Success', {
        amount,
        method: 'Card',
        donorEmail,
      });
    } catch (error: any) {
      Alert.alert('Payment Failed', error?.message ?? 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tap to Pay</Text>
        <Text style={styles.headerSubtitle}>
          Continue to Square Tap to Pay to complete this donation
        </Text>
      </View>

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Donation Amount</Text>
        <Text style={styles.amountValue}>${amount.toFixed(2)}</Text>
      </View>

      {/* Tap to Pay Card */}
      <View style={styles.cardPreview}>
        <Text style={styles.cardChip}>📲</Text>
        <Text style={styles.cardNumber}>Square Tap to Pay</Text>
        <View style={styles.cardDetails}>
          <View style={styles.cardDetailItem}>
            <Text style={styles.cardDetailLabel}>Amount</Text>
            <Text style={styles.cardDetailValue}>${amount.toFixed(2)}</Text>
          </View>
          <View style={styles.cardDetailItem}>
            <Text style={styles.cardDetailLabel}>Entry</Text>
            <Text style={styles.cardDetailValue}>No manual card input</Text>
          </View>
        </View>
      </View>

      {/* Security Info */}
      <View style={styles.securityContainer}>
        <Text style={styles.securityIcon}>🔒</Text>
        <Text style={styles.securityText}>
          Payment is handled by Square Tap to Pay
        </Text>
      </View>

      {/* Tap to Pay Button */}
      <TouchableOpacity
        style={[styles.payButton, loading && styles.payButtonLoading]}
        onPress={handleStartTapToPay}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.payButtonText}>Start Tap to Pay</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CardPaymentScreen;
