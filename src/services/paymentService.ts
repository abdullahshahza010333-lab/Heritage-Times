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

  if (message.includes('Must call MobilePaymentsSdk#initialize first')) {
    return 'Square SDK native initialization is missing. Set SQUARE_APPLICATION_ID in android/gradle.properties (or as env var), then rebuild: cd android && ./gradlew clean && cd .. && yarn android. Tap to Pay requires a real NFC-supported Android device; emulator is not supported.';
  }

  return message;
};

const isProbablyAndroidEmulator = (): boolean => {
  if (Platform.OS !== 'android') {
    return false;
  }

  const constants = (Platform as any).constants ?? {};
  const fingerprint = String(constants.Fingerprint ?? '').toLowerCase();
  const model = String(constants.Model ?? '').toLowerCase();
  const brand = String(constants.Brand ?? '').toLowerCase();
  const device = String(constants.Device ?? '').toLowerCase();
  const product = String(constants.Product ?? '').toLowerCase();
  const hardware = String(constants.Hardware ?? '').toLowerCase();

  return (
    fingerprint.includes('generic') ||
    fingerprint.includes('emulator') ||
    model.includes('emulator') ||
    model.includes('android sdk built for x86') ||
    hardware.includes('goldfish') ||
    hardware.includes('ranchu') ||
    product.includes('sdk_gphone') ||
    (brand.startsWith('generic') && device.startsWith('generic'))
  );
};

const validateSquarePaymentConfig = () => {
  const locationId = PAYMENT_CONFIG.LOCATION_ID.trim();
  if (!locationId) {
    throw new Error('Square LOCATION_ID is missing. Please set a valid Square location ID in paymentConfig.ts.');
  }

  if (locationId.startsWith('sandbox-sq0idb-') || locationId.startsWith('sq0idp-')) {
    throw new Error('Square LOCATION_ID is invalid: it looks like an Application ID. Use your Square Location ID from Developer Dashboard > Locations.');
  }
};

const authorizeIfNeeded = async (squareSdk: SquareSdk): Promise<void> => {
  const state = await squareSdk.getAuthorizationState();
  if (state !== squareSdk.AuthorizationState.AUTHORIZED) {
    await squareSdk.authorize(
      PAYMENT_CONFIG.ACCESS_TOKEN,
      PAYMENT_CONFIG.LOCATION_ID,
    );
  }
};

/**
 * Ensures the Square SDK is authorized before taking a payment.
 * Returns true if authorization succeeds, false otherwise.
 */
export const initializePayment = async (): Promise<void> => {
  try {
    if (isProbablyAndroidEmulator()) {
      throw new Error('Tap to Pay is not supported on Android emulator. Please test on a real NFC-supported Android device.');
    }

    validateSquarePaymentConfig();

    const squareSdk = getSquareSdk();
    try {
      await authorizeIfNeeded(squareSdk);
    } catch (firstError) {
      const firstMessage = firstError instanceof Error ? firstError.message : String(firstError);

      // On some Android devices the native SDK init can complete slightly after JS boot.
      if (Platform.OS === 'android' && firstMessage.includes('Must call MobilePaymentsSdk#initialize first')) {
        await new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 600);
        });
        await authorizeIfNeeded(squareSdk);
      } else {
        throw firstError;
      }
    }
  } catch (error) {
    const message = getSafeErrorMessage(error);
    console.warn('Authorization error:', message);
    throw new Error(message);
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
