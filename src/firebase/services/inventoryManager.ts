/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config";
import { getMaxStocks, updateStatus } from "./utilities";

export const GetItemsInventoryFirebase = (status: string) => {
  // Reference to the 'inventory' collection in the database
  let inventoryRef: any = collection(db, "inventory");
  console.debug("InventoryRef:", inventoryRef); // Debug: Check the initial reference to 'inventory' collection

  // Conditionally modify the query based on the status
  if (status !== "All") {
    inventoryRef = query(inventoryRef, where("status", "==", status));
    console.debug("Modified InventoryRef:", inventoryRef); // Debug: Check the modified query reference
  }

  // Set up a snapshot listener on the inventoryRef
  const unsubscribe = onSnapshot(inventoryRef, (snapshot: any) => {
    // Mapping through the documents in the snapshot to get their data
    const inventoryData = snapshot.docs.map((doc: any) => doc.data());
    console.debug("Inventory Data:", inventoryData); // Debug: Check the fetched inventory data

    // Optionally, you can log or handle the individual documents
    snapshot.docs.forEach((doc: any) => {
      console.debug("Document data:", doc.data()); // Debug: Check each document's data
    });
  });
  console.debug("Unsubscribe Function:", unsubscribe); // Debug: Check the unsubscribe function

  // Return the unsubscribe function to stop listening for updates
  return unsubscribe;
};

export const UpdateMaxStocks = async (itemCode: string, maxStock: number) => {
  const inventoryRef = collection(db, "inventory");
  const snapshot = await getDocs(
    query(inventoryRef, where("itemCode", "==", itemCode))
  );

  if (snapshot.empty) {
    console.log("No matching documents.");
    return false;
  }

  snapshot.docs.forEach(async (doc) => {
    await updateDoc(doc.ref, { stocks: maxStock, status: "Full Stock" });
    return true;
  });
};

export const GetRefillProductFirebase = async () => {
  let userRef: any = collection(db, "inventory");

  userRef = query(userRef, where("refillType", "==", true));

  const querySnapshot = await getDocs(userRef);

  const refillData = querySnapshot.docs.map((doc) => doc.data());

  return refillData;
};

export const GetPurchaseProductFirebase = async () => {
  let userRef: any = collection(db, "inventory");

  userRef = query(userRef, where("purchaseType", "==", true));

  const querySnapshot = await getDocs(userRef);

  const purchaseData = querySnapshot.docs.map((doc) => doc.data());

  return purchaseData;
};

const getInventoryDoc = async (itemCode: string) => {
  const inventoryRef = collection(db, "inventory");
  const snapshot = await getDocs(
    query(inventoryRef, where("itemCode", "==", itemCode))
  );

  if (snapshot.empty) {
    console.log("No matching documents.");
    return null;
  }

  return snapshot.docs[0];
};

export const SubtractQuantityStocks = async (
  itemName: string,
  itemCode: string,
  quantity: number,
  itemType: string
) => {
  const doc = await getInventoryDoc(itemCode);
  if (!doc) return;

  const data = doc.data();
  const currentStock = Number(data.stocks) || 0;
  const newStock = currentStock - Number(quantity);

  if (currentStock === 0) {
    toast.error(`${itemName} Stocks are now empty!`);
    return false;
  }
  if (newStock < 0) {
    toast.error("Stocks cannot be less than 0");
    return false;
  }

  if (itemType === "Purchase") {
    const maxStock = await getMaxStocks(itemCode);
    const status = updateStatus(newStock, maxStock);
    await updateDoc(doc.ref, { stocks: newStock, status: status });
  }
  return true;
};

export const PartialStockUpdate = async (itemCode: string, count: number) => {
  const doc = await getInventoryDoc(itemCode);
  if (!doc) return false;

  const data = doc.data();
  const currentStock = Number(data.stocks) || 0;
  const newStock = currentStock + Number(count);
  const maxStock = await getMaxStocks(itemCode);

  if (newStock === maxStock) {
    toast.info("Stocks are now full!");
    return false;
  }
  if (newStock > maxStock) {
    toast.error("Stocks cannot be more than the maximum stock");
    return false;
  }

  const status = updateStatus(newStock, maxStock);
  await updateDoc(doc.ref, { stocks: newStock, status: status });
  if (count !== 0) toast.success("Stocks are now updated!");
  return true;
};
