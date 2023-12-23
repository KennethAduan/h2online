/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { toast } from "react-toastify";
import { db } from "../config";
import {
  collection,
//   getDocs,
//   query,
//   where,
//   updateDoc,
  onSnapshot,
  Timestamp,
  addDoc,
  // doc,
//   deleteDoc,
  //   setDoc,
} from "firebase/firestore";
import { generateRandomId } from "./utilities";
const notifiedItems = new Set(); // This holds the item names that have been notified

export const AddNotificationsToFirebase = async (
    message: string,
    title: string
  ) => {
    try {
      const userRef = collection(db, "notifications");
      await addDoc(userRef, {
        id: generateRandomId(),
        title: title,
        message: message,
        date: Timestamp.fromDate(new Date()), // Use Firestore Timestamp
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  export const CheckItemStocksFirebase = () => {
    const inventoryRef = collection(db, "inventory");
  
    // Real-time listener
    onSnapshot(inventoryRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
          const data = change.doc.data();
          const itemName = data.item;
          const stocks = data.stocks;
  
          // Check if the stock is 0 and hasn't been notified yet
          if (stocks === 0 && !notifiedItems.has(itemName)) {
            AddNotificationsToFirebase(
              `Item ${itemName} is out of stock!`,
              "Stocks Report"
            );
            notifiedItems.add(itemName); // Prevent further notifications for the same item
          }
          // If the stock is replenished, remove from notified items
          if (stocks > 0 && notifiedItems.has(itemName)) {
            notifiedItems.delete(itemName);
          }
        }
      });
    });
  };