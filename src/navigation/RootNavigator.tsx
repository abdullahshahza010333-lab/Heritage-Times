import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// Import Screens
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import DonationSelectionScreen from '../screens/DonationSelectionScreen/DonationSelectionScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen/AdminLoginScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen/PaymentMethodScreen';
import CashPaymentScreen from '../screens/CashPaymentScreen/CashPaymentScreen';
import CardPaymentScreen from '../screens/CardPaymentScreen/CardPaymentScreen';
import ProcessingScreen from '../screens/ProcessingScreen/ProcessingScreen';
import SuccessScreen from '../screens/SuccessScreen/SuccessScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName='SplashScreen'
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        headerTintColor: '#2C1810',
      }}>
      {/* Splash Screen */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Donation Selection */}
      <Stack.Screen
        name="DonationSelection"
        component={DonationSelectionScreen}
        options={{
          title: 'Donation',
        }}
      />

      <Stack.Screen
        name="AdminLogin"
        component={AdminLoginScreen}
        options={{
          title: 'Admin Login',
        }}
      />

      {/* Payment Method */}
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen}
        options={{
          title: 'Payment Method',
        }}
      />

      {/* Cash Payment */}
      <Stack.Screen
        name="CashPayment"
        component={CashPaymentScreen}
        options={{
          title: 'Cash Payment',
        }}
      />

      {/* Card Payment */}
      <Stack.Screen
        name="CardPayment"
        component={CardPaymentScreen}
        options={{
          title: 'Card Payment',
        }}
      />

      {/* Processing */}
      <Stack.Screen
        name="Processing"
        component={ProcessingScreen}
        options={{
          title: 'Processing',
          headerShown: false,
        }}
      />

      {/* Success */}
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{
          title: 'Success',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
