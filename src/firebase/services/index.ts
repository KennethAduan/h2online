/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "../config";
import {
  collection,
  getDocs,
  query,
  where,
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

export const GetItemsInventoryFirebase = async (status: string) => {
  let userRef: any = collection(db, "inventory");

  if (status !== "All") {
    userRef = query(userRef, where("status", "==", status));
  }

  const querySnapshot = await getDocs(userRef);

  const inventoryData = querySnapshot.docs.map((doc) => doc.data());

  // console.log(inventoryData);
  return inventoryData;
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
