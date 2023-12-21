/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { GetPurchaseProductFirebase } from "../services";
const FetchPurchaseProduct = () => {
  const [item, setItem] = useState<any>([]);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await GetPurchaseProductFirebase();
      setItem(response);
    };
    fetchItem();
  }, []);
  //   console.log(item);
  return item;
};

export default FetchPurchaseProduct;
