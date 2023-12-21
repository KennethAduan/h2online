/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerAndNavLayout } from "../../layout";
import { Breadcrumbs } from "@material-tailwind/react";
import { LayoutCard, ProductCard } from "../../components";
import FetchRefillProduct from "../../firebase/hooks/FetchRefillProduct";
import FetchPurchaseProduct from "../../firebase/hooks/FetchPurchaseProduct";
import OrderTable from "./OrderTable/OrderTable";
const PointOfSales = () => {
  const RefillProducts = FetchRefillProduct();
  const PurchaseProducts = FetchPurchaseProduct();
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
                    <ProductCard
                      key={product.itemCode}
                      imageUrl={product.image}
                      productName={product.item}
                      productPrice={product.refillPrice}
                    />
                  </div>
                );
              })}
            </div>
          </LayoutCard>
          {/* For Purchase */}
          <LayoutCard title="For purchase">
            <div className="grid mt-4 lg:grid-cols-2 md:grid-cols-1 gap-2">
              {PurchaseProducts.map((product: any, index: number) => {
                return (
                  <div key={index}>
                    <ProductCard
                      key={product.itemCode}
                      imageUrl={product.image}
                      productName={product.item}
                      productPrice={product.purchasePrice}
                    />
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
              Total:{" "}
            </div>
          </LayoutCard>
        </div>
      </div>
    </DrawerAndNavLayout>
  );
};

export default PointOfSales;
