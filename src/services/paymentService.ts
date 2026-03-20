import { Platform } from 'react-native';
import { PAYMENT_CONFIG } from '../config/paymentConfig';

type SquareSdk = {
  authorize: (accessToken: string, locationId: string) => Promise<void>;
  getAuthorizationState: () => Promise<string>;
  startPayment: (paymentParameters: any, promptParameters: any) => Promise<any>;
  AuthorizationState: {
    AUTHORIZED: string;
  };
  ProcessingMode: {
    AUTO_DETECT: number;
  };
  AdditionalPaymentMethodType: {
    ALL: string;
  };
  PromptMode: {
    DEFAULT: number;
  };
};

const getSquareSdk = (): SquareSdk => {
  try {
    return require('mobile-payments-sdk-react-native') as SquareSdk;
  } catch {
    throw new Error(
      'Square Tap to Pay is unavailable in this build. On iOS simulator use: yarn ios:sim. On real device use: yarn ios:device.',
    );
  }
};

const getSafeErrorMessage = (error: unknown): string => {
  const message = error instanceof Error ? error.message : String(error);

  if (
    Platform.OS === 'ios' &&
    message.includes("doesn't seem to be linked")
  ) {
    return 'Square SDK is not linked for this iOS build. Use yarn ios:sim for simulator or yarn ios:device for real iPhone.';
  }

  return message;
};

/**
 * Ensures the Square SDK is authorized before taking a payment.
 * Returns true if authorization succeeds, false otherwise.
 */
export const initializePayment = async (): Promise<boolean> => {
  try {
    const squareSdk = getSquareSdk();
    const state = await squareSdk.getAuthorizationState();
    if (state !== squareSdk.AuthorizationState.AUTHORIZED) {
      await squareSdk.authorize(
        PAYMENT_CONFIG.ACCESS_TOKEN,
        PAYMENT_CONFIG.LOCATION_ID,
      );
    }

    return true;
  } catch (error) {
    console.warn('Authorization error:', getSafeErrorMessage(error));
    return false;
  }
};

/**
 * Starts a Square Tap to Pay flow for the given amount (in dollars).
 * Amount is converted to cents internally.
 */
export const payWithTap = async (amountInDollars: number) => {
  const squareSdk = getSquareSdk();
  const amountInCents = Math.round(amountInDollars * 100);

  const paymentParameters = {
    amountMoney: {
      amount: amountInCents,
      currencyCode: PAYMENT_CONFIG.CURRENCY,
    },
    processingMode: squareSdk.ProcessingMode.AUTO_DETECT,
    allowCardSurcharge: false, // required for Android
  };

  const promptParameters = {
    additionalMethods: [squareSdk.AdditionalPaymentMethodType.ALL],
    mode: squareSdk.PromptMode.DEFAULT,
  };

  return squareSdk.startPayment(paymentParameters, promptParameters);
};
