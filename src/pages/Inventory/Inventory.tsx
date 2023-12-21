/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerAndNavLayout } from "../../layout";
import { Breadcrumbs } from "@material-tailwind/react";
import { useState } from "react";
import { StockStatusButtons, ItemCard } from "../../components";
import FetchItemInventory from "../../firebase/hooks/FetchItemInventory";

const Inventory = () => {
  const [selectedStockStatus, setSelectedStockStatus] = useState<string>("All"); // Default to "All" StockStatus
  const handleSelectedStockStatus = (StockStatus: string) => {
    setSelectedStockStatus(StockStatus);
  };
  const IventoryData = FetchItemInventory(selectedStockStatus);
  // console.log(IventoryData);
  return (
    <DrawerAndNavLayout>
      <div>
        <Breadcrumbs className="mb-4 bg-black " placeholder={undefined}>
          <p className="font-bold text-white md:text-xl sm:text-lg lg:text-lg">
            INVENTORY
          </p>
        </Breadcrumbs>
        <StockStatusButtons
          onStockStatusSelect={handleSelectedStockStatus}
          selectedStockStatus={selectedStockStatus}
        />

        <div className="grid lg:grid-cols-4 md:grid-cols-2">
          {/* Changed to grid */}
          {IventoryData.map((item: any, index: number) => {
            return (
              <div key={index}>
                <ItemCard
                  name={item.item}
                  price={item.price}
                  status={item.status}
                  stock={item.stocks}
                  maxStock={item.maxStocks}
                  image={item.image}
                />
              </div>
            );
          })}
        </div>
      </div>
    </DrawerAndNavLayout>
  );
};

export default Inventory;
