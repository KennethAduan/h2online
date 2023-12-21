/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { db } from "../config";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
  Timestamp,
  addDoc,
  // doc,
  deleteDoc,
  //   setDoc,
} from "firebase/firestore";
import { UserInfoRedux } from "../../utils/redux/slice/userSlice";
import { AppDispatch } from "../../utils/redux/store";
const updateStatus = (newStock: number, maxStock: number) => {
  const medStock = calculateValueFromPercentage(50, maxStock) || 0;
  const lowStock = calculateValueFromPercentage(10, maxStock) || 0;

  let status = "Full Stock";

  if (newStock <= lowStock) {
    // Check for low stock first
    status = "Low Stock";
  } else if (newStock <= medStock) {
    // Then check for medium stock
    status = "Medium Stock";
  }
  return status;
};

function generateRandomId() {
  let id = Math.floor(Math.random() * 9 + 1).toString(); // Ensure the first number is not 0
  for (let i = 0; i < 11; i++) {
    id += Math.floor(Math.random() * 10); // Generate a number between 0 and 9
  }
  return id;
}

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
    return;
  }

  snapshot.docs.forEach(async (doc) => {
    await updateDoc(doc.ref, { stocks: maxStock, status: "Full Stock" });
    toast.success("Successfully updated the maximum stock!");
  });
};

export const PartialStockUpdate = async (itemCode: string, count: number) => {
  const inventoryRef = collection(db, "inventory");
  const snapshot = await getDocs(
    query(inventoryRef, where("itemCode", "==", itemCode))
  );

  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  const docs = snapshot.docs;
  for (const doc of docs) {
    const data = doc.data();
    const currentStock = Number(data.stocks) || 0; // Get the current stock
    const newStock = currentStock + Number(count); // Add count to the current stock
    const maxStock = await getMaxStocks(itemCode); // Get the maximum stock
    console.log("Max Stock:", maxStock);

    if (newStock === maxStock) {
      toast.success("Stocks are now full!");
    }
    if (newStock > maxStock) {
      toast.error("Stocks cannot be more than the maximum stock");
      continue; // Stop the update if new stock exceeds maximum stock
    }

    const status = updateStatus(newStock, maxStock);
    await updateDoc(doc.ref, { stocks: newStock, status: status }); // Update the stock
  }
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

export function calculateValueFromPercentage(P: number, X: number) {
  const Y = (P / 100) * X;
  return Y;
}

async function getMaxStocks(itemCode: string) {
  const inventoryRef = collection(db, "inventory");
  const snapshot = await getDocs(
    query(inventoryRef, where("itemCode", "==", itemCode))
  );
  return snapshot.docs[0].data().maxStocks;
}

const SubtractQuantityStocks = async (
  itemCode: string,
  quantity: number,
  dispatch: AppDispatch
) => {
  const inventoryRef = collection(db, "inventory");

  const snapshot = await getDocs(
    query(inventoryRef, where("itemCode", "==", itemCode))
  );

  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  const docs = snapshot.docs;
  for (const doc of docs) {
    const data = doc.data();
    const currentStock = Number(data.stocks) || 0; // Get the current stock
    const newStock = currentStock - Number(quantity); // Subtract quantity from the current stock

    if (currentStock === 0) {
      // toast.error("Stocks are now empty!");
      dispatch(UserInfoRedux({ isSuccessOrder: false }));
      continue; // Stop the update if new stock exceeds maximum stock
    }
    if (newStock < 0) {
      // toast.error("Stocks cannot be less than 0");
      dispatch(UserInfoRedux({ isSuccessOrder: false }));
      continue; // Stop the update if new stock exceeds maximum stock
    } else if (currentStock > quantity) {
      dispatch(UserInfoRedux({ isSuccessOrder: true }));
      continue; // Stop the update if current stock is higher than the quantity
    } else {
      const maxStock = await getMaxStocks(itemCode); // Get the maximum stock
      // console.log("Max Stock:", maxStock);
      const status = updateStatus(newStock, maxStock);
      await updateDoc(doc.ref, { stocks: newStock, status: status }); // Update the stock
      dispatch(UserInfoRedux({ isSuccessOrder: true }));
    }
  }
};

export const AddPurchaseOrderFirebase = async (
  items: any[],
  totalAmount: number,
  itemsNumber: number,
  dispatch: AppDispatch
) => {
  const purchaseOrderRef = collection(db, "purchaseOrders");
  const id = generateRandomId();
  // Create a new purchase order document

  const orderDocRef = await addDoc(purchaseOrderRef, {
    id: id,
    date: Timestamp.now(),
    itemsNumber: itemsNumber,
    totalAmount: totalAmount,
  });

  try {
    // Use the reference from the newly created purchase order to add items to its subcollection
    const invoiceRef = collection(orderDocRef, "purchaseItems");

    // Add each cart item as a separate document in the invoice collection
    for (const item of items) {
      await addDoc(invoiceRef, item);
    }

    items.forEach((item) => {
      const itemCode = item.itemCode;
      const quantity = item.quantity;
      // console.log(quantity);
      SubtractQuantityStocks(itemCode, quantity, dispatch);
    });
  } catch (error) {
    console.error("Error adding purchase items:", error);
    throw error;
  }
};

export const GetOrderItemsByOrderNumber = async (orderNumber: string) => {
  const ordersCollection = collection(db, "purchaseOrders");
  // console.log(`Searching for order with orderNumber: ${orderNumber}`);

  // Create a query to find the order by orderNumber
  const orderQuery = query(ordersCollection, where("id", "==", orderNumber));

  try {
    // Execute the query
    const orderSnapshot = await getDocs(orderQuery);

    // Check if the order with the specified orderNumber exists
    if (orderSnapshot.size > 0) {
      const orderDoc = orderSnapshot.docs[0];
      // console.log(
      //   `Found order document with ID: ${orderDoc.id} and data:`,
      //   orderDoc.data()
      // );

      const orderItemsCollectionRef = collection(orderDoc.ref, "purchaseItems");
      // console.log(
      //   `Fetching documents from ordersItems subcollection of order document with ID: ${orderDoc.id}`
      // );

      const orderItemsSnapshot = await getDocs(orderItemsCollectionRef);

      if (orderItemsSnapshot.size > 0) {
        const orderItemsData = orderItemsSnapshot.docs.map((doc) => doc.data());
        // console.log(
        //   `Found ${orderItemsSnapshot.size} documents in ordersItems subcollection:`,
        //   orderItemsData
        // );
        return orderItemsData;
      } else {
        // console.log("OrderItems collection is empty.");
        return [];
      }
    } else {
      // console.log("Order not found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const DeleteItemPurchaseOrderById = async (id: string) => {
  const ordersCollection = collection(db, "purchaseOrders");
  const orderQuery = query(ordersCollection, where("id", "==", id));

  const querySnapshot = await getDocs(orderQuery);
  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};

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
