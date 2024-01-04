import {
  collection,
  getDocs,
  query,
  where,
  // updateDoc,
  // onSnapshot,
  // Timestamp,
  // addDoc,
  // doc,
  // deleteDoc,
  //   setDoc,
} from "firebase/firestore";
import { db } from "../config";

export function generateRandomId() {
  let id = Math.floor(Math.random() * 9 + 1).toString(); // Ensure the first number is not 0
  for (let i = 0; i < 11; i++) {
    id += Math.floor(Math.random() * 10); // Generate a number between 0 and 9
  }
  return id;
}

export const updateStatus = (newStock: number, maxStock: number) => {
  const medStock = calculateValueFromPercentage(50, maxStock) || 0;
  const lowStock = calculateValueFromPercentage(10, maxStock) || 0;

  let status = "Full Stock";

  if (newStock <= lowStock) {
    // Check for low stock first
    status = "Low Stock";
  } else if (newStock <= medStock) {
    // Then check for medium stock
    status = "Moderate Stock";
  }
  return status;
};

export async function getMaxStocks(itemCode: string) {
  const inventoryRef = collection(db, "inventory");
  const snapshot = await getDocs(
    query(inventoryRef, where("itemCode", "==", itemCode))
  );
  return snapshot.docs[0].data().maxStocks;
}

export function calculateValueFromPercentage(P: number, X: number) {
  const Y = (P / 100) * X;
  return Y;
}
