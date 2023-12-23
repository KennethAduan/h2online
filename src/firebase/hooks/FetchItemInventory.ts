/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { GetItemsInventoryFirebase } from "../services/inventoryManager";
const FetchItemInventory = (status: string) => {
  const [item, setItem] = useState<any>([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await GetItemsInventoryFirebase(status);
        setItem(response);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };
    fetchItem();
  }, [status]);
  //   console.log(item);
  return item;
};

export default FetchItemInventory;
