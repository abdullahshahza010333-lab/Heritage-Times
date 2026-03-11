import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SplashScreen: undefined;
  DonationSelection: undefined;
  PaymentMethod: { amount: number };
  CashPayment: { amount: number };
  CardPayment: { amount: number };
  Processing: { amount: number };
  Success: { amount: number; method: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
