/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  collection,
  onSnapshot,
  QuerySnapshot,
  orderBy,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config";

const FetchNotification = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const docRef = collection(db, "notifications");
    // Include a 'where' clause to only fetch notifications where 'read' is false
    const queryRef = query(
      docRef,
      where("read", "==", false),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(queryRef, (snapshot: QuerySnapshot) => {
      const dataCollection = snapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID in the data
        ...doc.data(),
      }));
      setData(dataCollection);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const markAsRead = async (id: string) => {
    try {
      // Reference the 'notifications' collection
      const notificationsRef = collection(db, "notifications");

      // Create a query to find the notification with the matching 'id' field
      const q = query(notificationsRef, where("id", "==", id));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Assuming only one document will match, get the document's Firestore ID
      const docId = querySnapshot.docs[0]?.id;

      if (docId) {
        // Create a reference to the specific document to update
        const specificDocRef = doc(db, "notifications", docId);

        // Update the 'read' field of the specific document
        await updateDoc(specificDocRef, { read: true });
        // console.log(`Notification marked as read with ID: ${id}`);
      } else {
        // console.error(`No matching notification found with ID: ${id}`);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return { data, markAsRead };
};

export default FetchNotification;
