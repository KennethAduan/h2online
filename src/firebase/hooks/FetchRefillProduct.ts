/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { GetRefillProductFirebase } from "../services";
const FetchRefillProduct = () => {
  const [item, setItem] = useState<any>([]);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await GetRefillProductFirebase();
      setItem(response);
    };
    fetchItem();
  }, []);
  //   console.log(item);
  return item;
};

export default FetchRefillProduct;
