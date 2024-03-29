/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../config";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { generateRandomId } from "./utilities";
import { AddQuantityStocks, SubtractQuantityStocks } from "./inventoryManager";
import Swal from "sweetalert2";

export const AddPurchaseOrderFirebase = async (
  items: any[],
  totalAmount: number,
  itemsNumber: number,
  paymentType: string
) => {
  const purchaseOrderRef = collection(db, "purchaseOrders");
  const id = generateRandomId();
  // Create a new purchase order document

  const orderDocRef = await addDoc(purchaseOrderRef, {
    id: id,
    date: Timestamp.now(),
    itemsNumber: itemsNumber,
    totalAmount: totalAmount,
    paymentType: paymentType,
  });
  // Use the reference from the newly created purchase order to add items to its subcollection
  const invoiceRef = collection(orderDocRef, "purchaseItems");

  // Add each cart item as a separate document in the invoice collection
  for (const item of items) {
    await addDoc(invoiceRef, item);
  }
  let result = true;

  for (const item of items) {
    const itemCode = item.itemCode;
    const quantity = item.quantity;
    const itemName = item.name;
    const itemType = item.serviceType;
    // console.log("Item Name from order: " + itemName);
    result =
      (await SubtractQuantityStocks(itemName, itemCode, quantity, itemType)) ||
      false;
    (await SubtractQuantityStocks(
      "Big Cap Seal",
      "BigCapSeal123",
      quantity,
      itemType
    )) || false;
    if (!result) {
      break;
    }
  }
  return result;
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
  const ordersCollectionRef = collection(db, "purchaseOrders");
  const orderQuery = query(ordersCollectionRef, where("id", "==", id));

  const querySnapshot = await getDocs(orderQuery);
  for (const docSnapshot of querySnapshot.docs) {
    // Reference to the sub-collection
    const purchaseItemsCollectionRef = collection(
      docSnapshot.ref,
      "purchaseItems"
    );

    // Fetch all documents in the sub-collection
    const purchaseItemsSnapshot = await getDocs(purchaseItemsCollectionRef);
    for (const itemDoc of purchaseItemsSnapshot.docs) {
      // Delete each document in the sub-collection
      await deleteDoc(itemDoc.ref);
    }

    // After all sub-collection documents are deleted, delete the parent document
    await deleteDoc(docSnapshot.ref);
  }
};

// This is for refunding Items
export const RefundPurchaseOrderFirebase = async (
  items: any[],
  orderId: string
) => {
  try {
    if (orderId) {
      // console.log("Refunding Items", items);
      for (const item of items) {
        const itemCode = item.itemCode;
        const quantity = item.quantity;
        const itemType = item.serviceType;
        // console.log("Item Name from order: " + itemName);

        await AddQuantityStocks(itemCode, quantity, itemType);
        await DeleteItemPurchaseOrderById(orderId);
      }
      Swal.fire({
        title: "Success",
        text: "Refund has been made",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "An error occurred while refunding items",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error refunding items: ", error);
    Swal.fire({
      title: "Error",
      text: "An error occurred while refunding items",
      icon: "error",
    });
  }
};
