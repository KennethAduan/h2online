import React from "react";
import { Progress } from "@material-tailwind/react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";

import { useAppSelector } from "@/utils/redux/hooks";

async function updateInventoryStatusByItemCode(
  itemId: string,
  percentage: number
) {
  // Reference the 'inventory' collection
  const inventoryRef = collection(db, "inventory");

  // Create a query against the collection, filtering by 'itemCode'
  const q = query(inventoryRef, where("itemCode", "==", itemId));

  try {
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Iterate through each document and update the status
    querySnapshot.forEach(async (doc) => {
      let newStatus = "Full Stock";
      let newStocks = doc.data().stocks;

      if (percentage <= 25) {
        newStatus = "Low Stock";
        newStocks = 0; // Set stocks to 0
      } else if (percentage <= 50) {
        newStatus = "Moderate Stock";
      }

      // Update the status in the document
      await updateDoc(doc.ref, {
        status: newStatus,
        stocks: newStocks,
      });
    });

    // console.log("All matching inventory items updated successfully!");
  } catch (error) {
    console.error("Error updating inventory status:", error);
  }
}

interface TimeProgressBarProps {
  itemId: string;
}

const TimeProgressBar: React.FC<TimeProgressBarProps> = ({ itemId }) => {
  const percentage =
    useAppSelector((state) => state.countdown.timePercentages[itemId]) || 0;

  React.useEffect(() => {
    // Call the update function when the component mounts or when percentage changes
    updateInventoryStatusByItemCode(itemId, percentage);
  }, [itemId, percentage]); // Dependency array includes itemId and percentage

  enum colors {
    red = "red",
    yellow = "yellow",
    green = "green",
  }

  let color: colors = colors.green; // Default to green

  if (percentage <= 25) {
    color = colors.red; // Less than or equal to 25% -> Red
  } else if (percentage <= 50) {
    color = colors.yellow; // Less than or equal to 50% -> Yellow
  }

  return (
    <Progress
      color={color as colors}
      value={percentage}
      className="w-full"
      placeholder={undefined}
    />
  );
};

export default TimeProgressBar;
