import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './SuccessScreen.styles';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

const SuccessScreen: React.FC<Props> = ({ route, navigation }) => {
  const { amount, method, collectorName, cashCollectionId, donorEmail } = route.params;
  const isCash = method === 'Cash';
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
      <Text style={styles.successTitle}>
        {isCash ? 'Cash Confirmation' : 'Payment Successful!'}
      </Text>
      <Text style={styles.successSubtitle}>
        {isCash
          ? 'Please hand the cash amount shown below to a team member'
          : 'Thank you for your generous donation'}
      </Text>

      {/* Confirmation Section */}
      <View style={styles.receiptContainer}>
        <Text style={styles.receiptTitle}>
          {isCash ? 'Confirmation' : 'Receipt'}
        </Text>

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

          {isCash && collectorName ? (
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Collected By:</Text>
              <Text style={styles.receiptValue}>{collectorName}</Text>
            </View>
          ) : null}

          {isCash && cashCollectionId ? (
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Cash Record ID:</Text>
              <Text style={styles.receiptValue}>{cashCollectionId}</Text>
            </View>
          ) : null}

          {/* Date */}
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Date:</Text>
            <Text style={styles.receiptValue}>{date}</Text>
          </View>

          {donorEmail ? (
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Email:</Text>
              <Text style={styles.receiptValue}>{donorEmail}</Text>
            </View>
          ) : null}

          {!isCash && (
            <>
              {/* Transaction ID */}
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Transaction ID:</Text>
                <Text style={styles.receiptValue}>{transactionId}</Text>
              </View>

              {/* Status */}
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Status:</Text>
                <Text style={[styles.receiptValue, styles.statusCompleted]}> 
                  Completed
                </Text>
              </View>
            </>
          )}
        </View>
      </View>

      {!isCash && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageIcon}>💌</Text>
          <Text style={styles.messageText}>
            {donorEmail
              ? `A receipt has been sent to ${donorEmail}`
              : 'A confirmation email has been sent to your registered email address'}
          </Text>
        </View>
      )}

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleNewDonation}>
        <Text style={styles.primaryButtonText}>Done</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleHome}>
        <Text style={styles.secondaryButtonText}>Return Home</Text>
      </TouchableOpacity>

      {!isCash && (
        <View style={styles.impactContainer}>
          <Text style={styles.impactTitle}>Your Impact</Text>
          <Text style={styles.impactText}>
            Your ${amount.toFixed(2)} donation will help us continue our mission to
            preserve and celebrate our heritage for future generations.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default SuccessScreen;
