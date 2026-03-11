import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './CashPaymentScreen.styles';

type RootStackParamList = {
  CashPayment: { amount: number };
  Success: { amount: number; method: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'CashPayment'>;

const CashPaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { amount } = route.params;

  const handleConfirm = () => {
    navigation.navigate('Success', { amount, method: 'Cash' });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cash Payment</Text>
        <Text style={styles.headerSubtitle}>
          Complete your donation with cash
        </Text>
      </View>

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Donation Amount</Text>
        <Text style={styles.amountValue}>${amount.toFixed(2)}</Text>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>Instructions</Text>

        <View style={styles.instructionStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Look for the donation box</Text>
            <Text style={styles.stepDescription}>
              Find our Heritage Times donation collection box at your location
            </Text>
          </View>
        </View>

        <View style={styles.instructionStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Insert cash</Text>
            <Text style={styles.stepDescription}>
              Place your ${amount.toFixed(2)} donation in the box
            </Text>
          </View>
        </View>

        <View style={styles.instructionStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Get your receipt</Text>
            <Text style={styles.stepDescription}>
              Take your donation receipt as proof of contribution
            </Text>
          </View>
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Payment Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Donation Amount:</Text>
          <Text style={styles.detailValue}>${amount.toFixed(2)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method:</Text>
          <Text style={styles.detailValue}>Cash</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={[styles.detailValue, { color: '#F39C12' }]}>
            Pending Confirmation
          </Text>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CashPaymentScreen;
