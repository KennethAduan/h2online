/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { GetItemsInventoryFirebase } from "../services";
const FetchItemInventory = (status: string) => {
  const [item, setItem] = useState<any>([]);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await GetItemsInventoryFirebase(status);
      setItem(response);
    };
    fetchItem();
  }, [status]);
  //   console.log(item);
  return item;
};

export default FetchItemInventory;
