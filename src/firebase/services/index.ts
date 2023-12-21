/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../config";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
  //   setDoc,
} from "firebase/firestore";
export const checkUserData = async (username: string, password: string) => {
  const userRef = collection(db, "admin");
  const querySnapshot = await getDocs(
    query(
      userRef,
      where("password", "==", password),
      where("username", "==", username)
    )
  );
  return querySnapshot;
};

export const GetItemsInventoryFirebase = (status: string) => {
  // Reference to the 'inventory' collection in the database
  let inventoryRef:any = collection(db, "inventory");
  console.debug("InventoryRef:", inventoryRef);  // Debug: Check the initial reference to 'inventory' collection

  // Conditionally modify the query based on the status
  if (status !== "All") {
    inventoryRef = query(inventoryRef, where("status", "==", status));
    console.debug("Modified InventoryRef:", inventoryRef);  // Debug: Check the modified query reference
  }

  // Set up a snapshot listener on the inventoryRef
  const unsubscribe = onSnapshot(inventoryRef, (snapshot:any) => {
    // Mapping through the documents in the snapshot to get their data
    const inventoryData = snapshot.docs.map((doc:any) => doc.data());
    console.debug("Inventory Data:", inventoryData);  // Debug: Check the fetched inventory data

    // Optionally, you can log or handle the individual documents
    snapshot.docs.forEach((doc:any) => {
      console.debug("Document data:", doc.data());  // Debug: Check each document's data
    });
  });
  console.debug("Unsubscribe Function:", unsubscribe);  // Debug: Check the unsubscribe function

  // Return the unsubscribe function to stop listening for updates
  return unsubscribe;
};


export const UpdateMaxStocks = async (itemCode: string, maxStock: number) => {
  const inventoryRef = collection(db, "inventory");
  const snapshot = await getDocs(query(inventoryRef, where("itemCode", "==", itemCode)));

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  

  snapshot.docs.forEach(async doc => {
    await updateDoc(doc.ref, { stocks: maxStock });
  });
}

export const PartialStockUpdate = async (itemCode: string, maxStock: number) => {
  const inventoryRef = collection(db, "inventory");
  const snapshot = await getDocs(query(inventoryRef, where("itemCode", "==", itemCode)));

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  

  snapshot.docs.forEach(async doc => {
    await updateDoc(doc.ref, { stocks: maxStock });
  });
}
