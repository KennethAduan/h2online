import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config";

// Set both start and end dates to today
const today = new Date();
today.setHours(0, 0, 0, 0); // Set to the start of the day

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1); // Set to the start of the next day

// Create a query to get all sales for today
const salesQuery = query(
  collection(db, "purchaseOrders"),
  where("date", ">=", Timestamp.fromDate(today)),
  where("date", "<", Timestamp.fromDate(tomorrow)) // Less than the start of tomorrow
);

const GetAverageSales = async () => {
  const querySnapshot = await getDocs(salesQuery);
  let totalSales = 0;
  let transactionsCount = 0;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    totalSales += data.totalAmount; // add up all sales amounts
    transactionsCount++; // count each sale/transaction
  });

  // Calculate average: total sales divided by the number of transactions
  const averageSalesToday = transactionsCount
    ? totalSales / transactionsCount
    : 0; // avoid division by zero

  return averageSalesToday;
};

export default GetAverageSales;
