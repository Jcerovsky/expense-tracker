import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SERVER_ID,
  appId: import.meta.env.VITE_APP_ID,
};
initializeApp(firebaseConfig);

export const auth = getAuth();
const db = getFirestore();
const expensesRef = collection(db, "expenses");

interface expensesCollectionProps {
  item: string;
  date: string;
  description?: string;
  cost: number;
  category: string;
}

console.log("uid", auth.currentUser?.uid);

export const fetchData = async () => {
  try {
    const snapshot = await getDocs(expensesRef);
    const expensesArr: expensesCollectionProps[] = snapshot.docs.map(
      (expense) => {
        const expenseData = expense.data() as expensesCollectionProps;

        return {
          item: expenseData.item,
          cost: expenseData.cost,
          description: expenseData.description,
          date: expenseData.date,
          category: expenseData.category,
          id: expense.id,
        };
      },
    );
    return expensesArr;
  } catch (err) {
    console.log(err);
  }
};

export const addData = async (data: expensesCollectionProps) => {
  try {
    await addDoc(expensesRef, data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteData = async (id: string) => {
  try {
    const docRef = doc(db, "expenses", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.log(err);
  }
};
