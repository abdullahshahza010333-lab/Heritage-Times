import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './CardPaymentScreen.styles';
import Colors from '../../config/colors';
import { initializePayment, payWithTap } from '../../services/paymentService';
import { extractPaymentId, verifyPayment } from '../../services/verifyPaymentService';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CardPayment'>;

const CardPaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { amount, donorEmail: initialDonorEmail } = route.params;
  const [donorEmail, setDonorEmail] = useState(initialDonorEmail ?? '');
  const [loading, setLoading] = useState(false);
  const normalizedEmail = donorEmail.trim();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
  const hasEmail = normalizedEmail.length > 0;
  const hasInvalidEmail = hasEmail && !isValidEmail;

  const handleStartTapToPay = async () => {
    if (hasInvalidEmail) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await initializePayment();

      const paymentResult = await payWithTap(amount);

      const paymentId = extractPaymentId(paymentResult);
      if (paymentId) {
        try {
          await verifyPayment({
            paymentId,
            email: hasEmail ? normalizedEmail : undefined,
          });
        } catch (verifyError) {
          const verifyMessage =
            verifyError instanceof Error ? verifyError.message : String(verifyError);
          console.warn('Payment verification API failed:', verifyMessage);
          Alert.alert(
            'Verification Pending',
            'Payment completed, but receipt verification could not be confirmed right now.',
          );
        }
      } else {
        console.warn('Could not extract paymentId from Square response.', paymentResult);
      }

      navigation.replace('Success', {
        amount,
        method: 'Card',
        donorEmail: normalizedEmail || undefined,
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
        <Text style={styles.emailNote}>Add email to receive a receipt.</Text>
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
        style={[
          styles.payButton,
          (loading || hasInvalidEmail) && styles.payButtonDisabled,
          loading && styles.payButtonLoading,
        ]}
        onPress={handleStartTapToPay}
        disabled={loading || hasInvalidEmail}>
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
