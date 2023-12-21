/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerAndNavLayout } from "../../layout";
import { Breadcrumbs } from "@material-tailwind/react";
import { LayoutCard, ProductCard } from "../../components";
import FetchRefillProduct from "../../firebase/hooks/FetchRefillProduct";
import FetchPurchaseProduct from "../../firebase/hooks/FetchPurchaseProduct";
import OrderTable from "./OrderTable/OrderTable";
import { addItem } from "../../utils/redux/slice/orderSlice";
import { useAppDispatch, useAppSelector } from "../../utils/redux/hooks";
import PayButtonOrder from "./PayButton/PayButtonOrder";
import { formatPeso } from "../../utils/Helpers";
import { v4 as uuidv4 } from "uuid";

const PointOfSales = () => {
  const RefillProducts = FetchRefillProduct();
  const PurchaseProducts = FetchPurchaseProduct();
  const dispatch = useAppDispatch();
  const { totalAmount } = useAppSelector((state) => state.order);

  const idRefill = uuidv4();
  const idPurchase = uuidv4();

  const handleClickRefill = (product: any) => {
    // console.log("Clicked refill product data:", product);
    dispatch(
      addItem({
        id: idRefill,
        serviceType: "Refill",
        name: product.item,
        itemCode: product.itemCode,
        quantity: 1, // You might want to adjust this
        unitPrice: product.refillPrice,
        subPrice: product.refillPrice, // Assuming the product object has a refillPrice property
      })
    );
  };

  const handleClickPurchase = (product: any) => {
    // console.log("Clicked purchase product data:", product);
    dispatch(
      addItem({
        id: idPurchase,
        serviceType: "Purchase",
        name: product.item,
        itemCode: product.itemCode,
        quantity: 1, // You might want to adjust this
        unitPrice: product.purchasePrice, // Assuming the product object has a purchasePrice property
        subPrice: product.purchasePrice, // Assuming the product object has a purchasePrice property
      })
    );
  };

  return (
    <DrawerAndNavLayout>
      <Breadcrumbs className="mb-4 bg-black " placeholder={undefined}>
        <p className="font-bold text-white md:text-xl sm:text-lg lg:text-lg">
          POINT OF SALES
        </p>
      </Breadcrumbs>
      <div className="grid grid-cols-2 gap-4 space-x-4">
        <div className="w-4/5">
          {/* For Refill */}
          <LayoutCard title="For refill">
            <div className="grid mt-4 lg:grid-cols-2 md:grid-cols-2">
              {RefillProducts.map((product: any, index: number) => {
                return (
                  <div key={index}>
                    <button onClick={() => handleClickRefill(product)}>
                      <ProductCard
                        key={product.itemCode}
                        imageUrl={product.image}
                        productName={product.item}
                        productPrice={product.refillPrice}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </LayoutCard>
          {/* For Purchase */}
          <LayoutCard title="For purchase">
            <div className="grid gap-2 mt-4 lg:grid-cols-2 md:grid-cols-1">
              {PurchaseProducts.map((product: any, index: number) => {
                return (
                  <div key={index}>
                    <button onClick={() => handleClickPurchase(product)}>
                      <ProductCard
                        key={product.itemCode}
                        imageUrl={product.image}
                        productName={product.item}
                        productPrice={product.purchasePrice}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </LayoutCard>
        </div>
        <div>
          <LayoutCard title="Order Summary">
            <OrderTable />

            <div className="flex justify-end mt-32 text-2xl font-bold text-AccentFontColor">
              Total: {formatPeso(totalAmount)}
            </div>
          </LayoutCard>
          <div className="flex justify-end my-12">
            <PayButtonOrder />
          </div>
        </div>
      </div>
    </DrawerAndNavLayout>
  );
};

export default PointOfSales;
