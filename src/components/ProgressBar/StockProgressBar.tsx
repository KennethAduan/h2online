import { Progress } from "@material-tailwind/react";
import { calculateValueFromPercentage } from "@/utils/Helpers/ItemCardHelpers";
const StockProgressBar = ({
  stock,
  maxStock,
}: {
  stock: number | undefined;
  maxStock: number | undefined;
}) => {
  const medStock = calculateValueFromPercentage(50, maxStock) || 0;
  const lowStock = calculateValueFromPercentage(10, maxStock) || 0;
  enum colors {
    GREEN = "green",
    RED = "red",
    YELLOW = "yellow",
  }

  let color = colors.GREEN;
  if (stock !== undefined && maxStock !== undefined) {
    if (stock <= lowStock) {
      // Check for low stock first
      color = colors.RED;
    } else if (stock <= medStock) {
      // Then check for medium stock
      color = colors.YELLOW;
    }
  }
  return (
    <Progress
      color={color}
      value={stock && maxStock ? (stock / maxStock) * 100 : 0}
      placeholder={undefined}
    />
  );
};

export default StockProgressBar;
