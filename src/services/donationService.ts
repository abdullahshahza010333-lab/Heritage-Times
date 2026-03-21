import firestore from '@react-native-firebase/firestore';
import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DONATION_COLLECTION = 'donation_amount';

export interface DonationAmount {
  id: string;
  amount: number;
}

const toPositiveNumber = (value: unknown): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }
  return parsed;
};

const parseDonationDoc = (
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
): DonationAmount | null => {
  const data = doc.data();
  const amount = toPositiveNumber(data.price ?? data.amount);

  if (amount <= 0) {
    return null;
  }

  return {
    id: doc.id,
    amount,
  };
};

export const fetchDonationAmounts = async (): Promise<DonationAmount[]> => {
  const snapshot = await firestore().collection(DONATION_COLLECTION).get();
  console.log("🚀 ~ fetchDonationAmounts ~ snapshot:", snapshot)

  return snapshot.docs
    .map(parseDonationDoc)
    .filter((item): item is DonationAmount => item !== null)
    .sort((a, b) => a.amount - b.amount);
};

export const updateDonationAmounts = async (
  updatedAmounts: DonationAmount[],
): Promise<void> => {
  if (!auth().currentUser) {
    throw new Error('auth-required');
  }

  await Promise.all(
    updatedAmounts.map(item => {
      const donationRef = firestore().collection(DONATION_COLLECTION).doc(item.id);

      return donationRef.set(
        {
          docId: item.id,
          price: String(item.amount),
        },
        { merge: true },
      );
    }),
  );
};
