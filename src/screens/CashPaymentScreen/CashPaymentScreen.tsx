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
        <Text style={styles.headerTitle}>Cash Confirmation</Text>
        <Text style={styles.headerSubtitle}>
          A team member will collect your donation
        </Text>
      </View>

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Cash Amount</Text>
        <Text style={styles.amountValue}>${amount.toFixed(2)}</Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm Cash Received</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CashPaymentScreen;
