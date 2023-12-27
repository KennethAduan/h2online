/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetOrderItemsByOrderNumber } from "../services/orderManager";
import { useState, useEffect } from "react";
const GetOrderRefund = (orderId: string | null) => {
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (orderId) {
        const data = await GetOrderItemsByOrderNumber(orderId);
        setOrderData(data);
      }
    };
    fetchItems();
  }, [orderId]);

  return orderData;
};

export default GetOrderRefund;
