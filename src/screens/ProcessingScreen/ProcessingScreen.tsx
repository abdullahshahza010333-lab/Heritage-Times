import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { moderateScale as RFValue } from 'react-native-size-matters';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './ProcessingScreen.styles';
import Colors from '../../config/colors';

type RootStackParamList = {
  Processing: { amount: number };
  Success: { amount: number; method: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Processing'>;

const ProcessingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { amount } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Success', { amount, method: 'Card' });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, amount]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Processing Icon */}
        <View style={styles.processingIconContainer}>
          <Text style={styles.processingIcon}>💳</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Processing Payment</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Please wait while we process your donation
        </Text>

        {/* Amount */}
        <Text style={styles.amount}>${amount.toFixed(2)}</Text>

        {/* Loading Indicator */}
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size={RFValue(40)}
            color={Colors.primary}
          />
        </View>

        {/* Status Message */}
        <Text style={styles.statusMessage}>
          Securely processing your transaction...
        </Text>
      </View>
    </View>
  );
};

export default ProcessingScreen;
