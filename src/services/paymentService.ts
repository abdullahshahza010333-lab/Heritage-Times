import {
  authorize,
  getAuthorizationState,
  startPayment,
  AuthorizationState,
  type PaymentParameters,
} from 'mobile-payments-sdk-react-native';
import { PAYMENT_CONFIG } from '../config/paymentConfig';

/**
 * Ensures the Square SDK is authorized before taking a payment.
 * Returns true if authorization succeeds, false otherwise.
 */
export const initializePayment = async (): Promise<boolean> => {
  try {
    const state = await getAuthorizationState();
    if (state !== AuthorizationState.AUTHORIZED) {
      await authorize(
        PAYMENT_CONFIG.ACCESS_TOKEN,
        PAYMENT_CONFIG.LOCATION_ID,
      );
    }

    return true;
  } catch (error) {
    console.warn('Authorization error:', error);
    return false;
  }
};

/**
 * Starts a Square Tap to Pay flow for the given amount (in dollars).
 * Amount is converted to cents internally.
 */
export const payWithTap = async (amountInDollars: number) => {
  const amountInCents = Math.round(amountInDollars * 100);

  const paymentParameters: PaymentParameters = {
    amountMoney: {
      amount: amountInCents,
      currencyCode: PAYMENT_CONFIG.CURRENCY,
    },
    processingMode: 2, // AUTO_DETECT (0=ONLINE_ONLY, 1=OFFLINE_ONLY, 2=AUTO_DETECT)
    allowCardSurcharge: false, // required for Android
  };

  return startPayment(paymentParameters);
};
