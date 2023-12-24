import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config";

const GetLatestOrderDoc = () => {
  const [latestOrderId, setLatestOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Reference to the 'purchaseOrders' collection
    const purchaseOrdersRef = collection(db, "purchaseOrders");

    // Create a query against the collection, ordering by date descending and limiting to 1
    const q = query(purchaseOrdersRef, orderBy("date", "desc"), limit(1));

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        // Extract the 'id' field from the latest order document
        const latestDoc = querySnapshot.docs[0]?.data(); // Safely access the first document if it exists
        const orderId = latestDoc?.id;
        setLatestOrderId(orderId); // Set the ID from the document's 'id' field
      },
      (error) => {
        console.error("Error fetching latest order ID:", error);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return latestOrderId; // Return only the ID of the latest order
};

export default GetLatestOrderDoc;
