import { Button } from "@material-tailwind/react";

interface StockStatusButtonsProps {
  onStockStatusSelect: (StockStatus: string) => void;
  selectedStockStatus: string;
}

export const StockStatusButtons: React.FC<StockStatusButtonsProps> = ({
  onStockStatusSelect,
  selectedStockStatus,
}: StockStatusButtonsProps) => {
  const StockStatusButton = [
    "All",
    "Full Stock",
    "Moderate Stock",
    "Low Stock",
  ]; // Buttons if Mens or Womens

  const handleStockStatusClick = (StockStatus: string) => {
    onStockStatusSelect(StockStatus); // Trigger the provided callback with the selected StockStatus
  };

  return (
    <div className="flex items-center justify-start px-10 py-8">
      {StockStatusButton.map((StockStatus: string, index: number) => {
        return (
          <div key={index} className="mr-4">
            <Button
              size="lg"
              placeholder={undefined}
              variant="text"
              color="gray"
              ripple={true}
              className={`hover:bg-[#1976D2] hover:text-white ${
                selectedStockStatus === StockStatus
                  ? "bg-[#1976D2] text-white"
                  : ""
              }`}
              onClick={() => handleStockStatusClick(StockStatus)}
            >
              {StockStatus}
            </Button>
          </div>
        );
      })}
    </div>
  );
};
