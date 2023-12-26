import GetAverageSales from "@/firebase/hooks/GetAverageSales";
import GetMonthlySales from "@/firebase/hooks/GetMonthlySales";
import GetTotalRevenue from "@/firebase/hooks/GetTotalRevenue";
import { useState } from "react";
const SalesHooksCard = () => {
  const [averageState, setAverage] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [revenue, setRevenue] = useState(0);
  GetAverageSales().then((average) => {
    // console.log(`Today's average sales is: ₱${average.toFixed(2)}`);
    setAverage(average);
  });
  GetMonthlySales().then((totalSales) => {
    // console.log(`Total sales for the current month: ${totalSales}`);
    setMonthlySales(totalSales);
    // You can further process the totalSales, send it in a response, etc.
  });

  GetTotalRevenue().then((totalRevenue) => {
    // console.log(`Total sales for the current month: ${totalSales}`);
    setRevenue(totalRevenue);
    // You can further process the totalSales, send it in a response, etc.
  });

  return { revenue, averageState, monthlySales };
};

export default SalesHooksCard;
