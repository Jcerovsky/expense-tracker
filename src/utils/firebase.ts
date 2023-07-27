import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

interface expensesCollectionProps {
  item: string;
  date: string;
  description?: string;
  cost: number;
}

export const fetchData = async () => {
  try {
    const db = getFirestore();
    const expensesRef = collection(db, "expenses");
    const snapshot = await getDocs(expensesRef);
    const expensesArray: expensesCollectionProps[] = snapshot.docs.map(
      (expense) => {
        const expenseData = expense.data() as expensesCollectionProps;
        return {
          item: expenseData.item,
          description: expenseData.description,
          cost: expenseData.cost,
          date: expenseData.date,
        };
      },
    );
    return expensesArray;
  } catch (err) {
    console.log(err);
  }
};
