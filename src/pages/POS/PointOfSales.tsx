/* eslint-disable @typescript-eslint/no-explicit-any */

import { Breadcrumbs } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { DrawerAndNavLayout } from "@/layout";

import { LayoutCard, ProductCard, RecentOrderModal } from "@/components";
import FetchRefillProduct from "@/firebase/hooks/FetchRefillProduct";
import FetchPurchaseProduct from "@/firebase/hooks/FetchPurchaseProduct";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { addItem } from "@/utils/redux/slice/orderSlice";

import OrderTable from "./OrderTable/OrderTable";
import PayButtonOrder from "./PayButton/PayButtonOrder";
import ClearOrders from "./ClearOrder/ClearOrders";
import RefundButton from "./RefundButton/RefundButton";
import { formatPeso } from "@/utils/Helpers";
import SelectPayment from "./SelectPayment/SelectPayment";
const PointOfSales = () => {
  const RefillProducts = FetchRefillProduct();
  const PurchaseProducts = FetchPurchaseProduct();
  // console.log("RefillProducts", RefillProducts);
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
        priceTaxPurchase: product.unitPriceTax,
        unitPricePurchase: product.unitPriceRefill,
        quantity: 1,
        unitPrice: product.refillPrice,
        subPrice: product.refillPrice,
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
        quantity: 1,
        unitPrice: product.purchasePrice,
        subPrice: product.purchasePrice,
        unitPricePurchase: product.unitPricePurchase,
        priceTaxPurchase: product.priceTaxPurchase,
      })
    );
  };

  return (
    <DrawerAndNavLayout>
      <div className="flex justify-between">
        <Breadcrumbs className="mb-4 bg-black " placeholder={undefined}>
          <p className="font-bold text-white md:text-xl sm:text-lg lg:text-lg">
            POINT OF SALES
          </p>
        </Breadcrumbs>
        <div>
          <RecentOrderModal />
        </div>
      </div>
      <div className="grid grid-cols-2 ">
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
            <div className="mt-12">
              <h1 className="text-2xl font-bold text-AccentFontColor">
                Select Payment
              </h1>
              <SelectPayment />
            </div>

            <div className="flex justify-between mt-12 text-2xl font-bold text-AccentFontColor">
              <ClearOrders />
              Total: {formatPeso(totalAmount)}
            </div>
          </LayoutCard>
          <div className="flex justify-between my-12">
            <div>
              <RefundButton />
            </div>
            <div>
              <PayButtonOrder />
            </div>
          </div>
        </div>
      </div>
    </DrawerAndNavLayout>
  );
};

export default PointOfSales;
