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
      where("userName", "==", username)
    )
  );
  return querySnapshot;
};
