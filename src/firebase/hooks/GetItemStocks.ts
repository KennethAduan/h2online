import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { QuerySnapshot } from "firebase/firestore";
import { db } from "../config";

export default function getInventoryData(status: string) {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    let docRef:any = collection(db, "inventory");

    // Apply the status filter if status is not 'All'
    if (status !== "All") {
      docRef = query(docRef, where("status", "==", status));
    }

    const unsubscribe = onSnapshot(docRef, (snapshot: QuerySnapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setData(items);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [status]); // Dependency array includes status to re-run the effect when status changes

  return data;
}
