/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config";

const GetAdminCredentials = (userId: string) => {
  const [adminData, setAdminData] = useState<any | null>(null);

  useEffect(() => {
    if (userId !== null) {
      const q = query(collection(db, "admin"), where("userId", "==", userId));
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))[0];
          setAdminData(data);
        },
        (error) => {
          console.error("Error fetching admin data:", error);
        }
      );

      return () => unsubscribe();
    }
  }, [userId]);

  return adminData;
};

export default GetAdminCredentials;
