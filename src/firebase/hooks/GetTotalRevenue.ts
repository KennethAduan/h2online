import { collection, getDocs } from "firebase/firestore";
import { db } from "../config"; // Adjust this path to where your Firebase config is initialized

const GetTotalRevenue = async () => {
  let totalRevenue = 0;
  let totalTaxDeductions = 0;

  // Reference to the 'purchaseOrders' collection
  const purchaseOrdersRef = collection(db, "purchaseOrders");

  // Fetch all purchase orders
  const purchaseOrdersSnapshot = await getDocs(purchaseOrdersRef);

  // Iterate through each purchase order to calculate totalRevenue and totalTaxDeductions
  for (const purchaseOrderDoc of purchaseOrdersSnapshot.docs) {
    const purchaseOrderData = purchaseOrderDoc.data();
    totalRevenue += purchaseOrderData.totalAmount || 0; // Add to totalRevenue

    // Reference to the 'purchaseItems' subcollection for the current order
    const purchaseItemsRef = collection(
      db,
      `purchaseOrders/${purchaseOrderDoc.id}/purchaseItems`
    );

    // Fetch all items for the current purchase order
    const purchaseItemsSnapshot = await getDocs(purchaseItemsRef);

    // Sum 'priceTaxPurchase' for each item in the current order
    purchaseItemsSnapshot.forEach((itemDoc) => {
      const itemData = itemDoc.data();
      totalTaxDeductions += itemData.priceTaxPurchase || 0; // Add to totalTaxDeductions
    });
  }

  const netRevenue = totalRevenue - totalTaxDeductions; // Calculate the net revenue
  return netRevenue; // Return the net revenue
};

export default GetTotalRevenue;
