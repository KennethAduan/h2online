/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore";

import { db } from "../config";
import { useEffect, useState } from "react";

export function FetchPurchaseOrder() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const docRef: any = collection(db, "purchaseOrders");

    const unsubscribe = onSnapshot(docRef, (snapshot: QuerySnapshot) => {
      const dataCollection = snapshot.docs.map((doc) => doc.data());
      setData(dataCollection);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return data;
}
