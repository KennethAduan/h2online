import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

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