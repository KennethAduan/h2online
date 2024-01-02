import {
  Login,
  PointOfSales,
  Sales,
  Inventory,
  NotFoundPage,
  PurchaseOrder,
} from "@/pages";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route index element={<Login />} />
        <Route element={<PointOfSales />} path="/pos" />
        <Route element={<Sales />} path="/sales" />
        <Route element={<Inventory />} path="/inventory" />
        <Route element={<PurchaseOrder />} path="/purchase-order" />
      </Route>
      <Route element={<NotFoundPage />} path="*" />
      <Route element={<Login />} path="/" />
    </Routes>
  );
};

export default MainRoutes;
