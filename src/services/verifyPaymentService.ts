const API_BASE_URL = 'https://heritagetimeappbk.vercel.app';

const getApiBaseUrl = (): string => {
  return API_BASE_URL.replace(/\/$/, '');
};

export interface VerifyPaymentPayload {
  paymentId: string;
  email?: string;
}

const readErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = await response.json();
    if (data && typeof data === 'object' && 'message' in data) {
      return String(data.message);
    }
    return JSON.stringify(data);
  } catch {
    const text = await response.text();
    return text || `Request failed with status ${response.status}`;
  }
};

export const verifyPayment = async (payload: VerifyPaymentPayload) => {
  const response = await fetch(`${getApiBaseUrl()}/verify-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
};

export const extractPaymentId = (paymentResult: unknown): string | null => {
  if (!paymentResult || typeof paymentResult !== 'object') {
    return null;
  }

  const result = paymentResult as Record<string, unknown>;
  const directPaymentId = result.paymentId;
  if (typeof directPaymentId === 'string' && directPaymentId.trim()) {
    return directPaymentId.trim();
  }

  const payment = result.payment as Record<string, unknown> | undefined;
  const nestedPaymentId = payment?.id;
  if (typeof nestedPaymentId === 'string' && nestedPaymentId.trim()) {
    return nestedPaymentId.trim();
  }

  const nestedResult = result.result as Record<string, unknown> | undefined;
  const nestedResultPayment = nestedResult?.payment as Record<string, unknown> | undefined;
  const nestedResultPaymentId = nestedResultPayment?.id;
  if (typeof nestedResultPaymentId === 'string' && nestedResultPaymentId.trim()) {
    return nestedResultPaymentId.trim();
  }

  return null;
};
