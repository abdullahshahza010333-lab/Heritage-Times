import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SplashScreen: undefined;
  DonationSelection: undefined;
  AdminLogin: undefined;
  PaymentMethod: { amount: number; donorEmail?: string };
  CashPayment: { amount: number; donorEmail?: string };
  CardPayment: { amount: number; donorEmail?: string };
  Processing: { amount: number; donorEmail?: string };
  Success: {
    amount: number;
    method: string;
    collectorName?: string;
    cashCollectionId?: string;
    donorEmail?: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
