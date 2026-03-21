import firestore from '@react-native-firebase/firestore';
import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const EMPLOYEES_COLLECTION = 'employees';
const CASH_COLLECTIONS_COLLECTION = 'cash_collections';

export interface EmployeeOption {
  id: string;
  name: string;
}

const parseEmployee = (
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
): EmployeeOption | null => {
  const data = doc.data();
  const name = String(data.name ?? '').trim();

  if (!name) {
    return null;
  }

  return {
    id: doc.id,
    name,
  };
};

export const fetchEmployees = async (): Promise<EmployeeOption[]> => {
  const snapshot = await firestore().collection(EMPLOYEES_COLLECTION).get();

  return snapshot.docs
    .map(parseEmployee)
    .filter((item): item is EmployeeOption => item !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
};

export interface SaveCashCollectionInput {
  amount: number;
  collectorId: string;
  collectorName: string;
  donorEmail?: string;
}

export const saveCashCollection = async (
  payload: SaveCashCollectionInput,
): Promise<string> => {
  const ref = await firestore().collection(CASH_COLLECTIONS_COLLECTION).add({
    amount: payload.amount,
    collectorId: payload.collectorId,
    collectorName: payload.collectorName,
    donorEmail: payload.donorEmail ?? null,
    method: 'cash',
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  return ref.id;
};
