import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config";

// Function to calculate sales for the current month
const GetMonthlySales = async () => {
  // Get the current date
  const currentDate = new Date();

  // Extract the current year and month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // Note: January is 0, December is 11

  // Define the start and end dates for the target month
  const startDate = new Date(year, month, 1); // Start of the current month
  const endDate = new Date(year, month + 1, 0); // Last day of the current month

  // Reference to your sales collection
  const salesRef = collection(db, "purchaseOrders");

  // Query for sales in the target month
  const salesQuery = query(
    salesRef,
    where("date", ">=", Timestamp.fromDate(startDate)),
    where("date", "<=", Timestamp.fromDate(endDate))
  );

  // Execute the query
  const querySnapshot = await getDocs(salesQuery);
  let totalSales = 0;

  // Sum up the sales amounts
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    totalSales += data.totalAmount; // Ensure 'amount' is the correct field name for the sales amount
  });

  // Return the total sales
  return totalSales;
};

export default GetMonthlySales;
