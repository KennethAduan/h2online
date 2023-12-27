import { Login, PointOfSales, Sales, Inventory, NotFoundPage } from "@/pages";
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
      </Route>
      <Route element={<NotFoundPage />} path="*" />
      <Route element={<Login />} path="/" />
    </Routes>
  );
};

export default MainRoutes;
