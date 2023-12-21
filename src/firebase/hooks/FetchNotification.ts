/* eslint-disable @typescript-eslint/no-explicit-any */

import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config";

const FetchNotification = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const docRef: any = collection(db, "notifications");

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
};

export default FetchNotification;
