import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './SuccessScreen.styles';

type RootStackParamList = {
  Success: { amount: number; method: string };
  SplashScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

const SuccessScreen: React.FC<Props> = ({ route, navigation }) => {
  const { amount, method } = route.params;
  const transactionId = `HT${Date.now().toString().slice(-8)}`;
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleNewDonation = () => {
    navigation.popToTop();
  };

  const handleHome = () => {
    navigation.popToTop();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}>
      {/* Success Icon */}
      <View style={styles.successIconContainer}>
        <Text style={styles.successIcon}>✓</Text>
      </View>

      {/* Success Message */}
      <Text style={styles.successTitle}>Payment Successful!</Text>
      <Text style={styles.successSubtitle}>
        Thank you for your generous donation
      </Text>

      {/* Receipt Section */}
      <View style={styles.receiptContainer}>
        <Text style={styles.receiptTitle}>Receipt</Text>

        <View style={styles.receiptContent}>
          {/* Amount */}
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Donation Amount:</Text>
            <Text style={styles.receiptValue}>${amount.toFixed(2)}</Text>
          </View>

          {/* Payment Method */}
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Payment Method:</Text>
            <Text style={styles.receiptValue}>{method}</Text>
          </View>

          {/* Date */}
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Date:</Text>
            <Text style={styles.receiptValue}>{date}</Text>
          </View>

          {/* Transaction ID */}
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Transaction ID:</Text>
            <Text style={styles.receiptValue}>{transactionId}</Text>
          </View>

          {/* Status */}
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Status:</Text>
            <Text style={[styles.receiptValue, { color: '#27AE60' }]}>
              Completed
            </Text>
          </View>
        </View>
      </View>

      {/* Message */}
      <View style={styles.messageContainer}>
        <Text style={styles.messageIcon}>💌</Text>
        <Text style={styles.messageText}>
          A confirmation email has been sent to your registered email address
        </Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleNewDonation}>
        <Text style={styles.primaryButtonText}>Make Another Donation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleHome}>
        <Text style={styles.secondaryButtonText}>Return Home</Text>
      </TouchableOpacity>

      {/* Impact Message */}
      <View style={styles.impactContainer}>
        <Text style={styles.impactTitle}>Your Impact</Text>
        <Text style={styles.impactText}>
          Your ${amount.toFixed(2)} donation will help us continue our mission to
          preserve and celebrate our heritage for future generations.
        </Text>
      </View>
    </ScrollView>
  );
};

export default SuccessScreen;
