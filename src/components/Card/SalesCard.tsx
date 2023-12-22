import { Card, CardBody, Typography } from "@material-tailwind/react";
import { formatPeso } from "../../utils/Helpers";

interface SalesCardProps {
  titleSales: string;
  totalSales: number;
  icon?: React.ReactNode | string;
}

const SalesCard = ({ titleSales, totalSales, icon }: SalesCardProps) => {
  return (
    <Card
      className="h-48 mt-6 border-2 md:w-72 lg:w-auto border-PrimaryBackGround sm:w-96" // Responsive width
      placeholder={undefined}
    >
      <CardBody placeholder={undefined}>
        <div className="flex justify-around">
          <div className="text-3xl sm:text-4xl">{icon}</div>{" "}
          {/* Responsive icon size */}
          <div className="mt-10">
            <Typography
              variant="h3"
              className="text-lg text-PrimaryBackGround sm:text-xl md:text-2xl" // Responsive text size
              placeholder={undefined}
            >
              {formatPeso(totalSales)}
            </Typography>
            <Typography
              variant="h5"
              className="mt-4 text-base text-PrimaryBackGround sm:text-lg" // Responsive text size
              placeholder={undefined}
            >
              {titleSales}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesCard;
