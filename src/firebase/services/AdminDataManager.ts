import { db } from "../config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
type AdminData = {
  userId: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  // Add other fields as necessary
};

export const EditAdminData = async (data: AdminData) => {
  if (!data.userId) {
    console.error("No userId provided");
    return;
  }

  try {
    const adminRef = collection(db, "admin");
    const q = query(adminRef, where("userId", "==", data.userId));
    const querySnapshot = await getDocs(q);
    const docId = querySnapshot.docs[0]?.id;

    if (docId) {
      const specificDocRef = doc(db, "admin", docId);

      // Create a new object that doesn't include the 'userId' field
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId, ...updateData } = data;

      // Update the admin document (userId is not included in the update)
      await updateDoc(specificDocRef, updateData);
      // Optionally, show a message or handle the updated state
      toast.success("Profile Successfully Save !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   console.log(`Admin data updated for userId: ${data.userId}`);
    } else {
      toast.error("No matching document found! ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   console.error("No matching document found for the provided userId");
    }
  } catch (error) {
    toast.error("Error updating admin data! ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // console.error("Error updating admin data:", error);
  }
};
