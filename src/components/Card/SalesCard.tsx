import { Card, CardBody, Typography } from "@material-tailwind/react";
interface SalesCardProps {
  titleSales: string;
  totalSales: number;
  icon?: React.ReactNode | string;
}

import { formatPeso } from "../../utils/Helpers";
const SalesCard = ({ titleSales, totalSales, icon }: SalesCardProps) => {
  return (
    <Card
      className="h-48 mt-6 border-2 w-96 border-PrimaryBackGround"
      placeholder={undefined}
    >
      <CardBody placeholder={undefined}>
        <div className="flex justify-around">
          <div>{icon}</div>
          <div className="mt-10">
            <Typography
              variant="h3"
              className="text-PrimaryBackGround"
              placeholder={undefined}
            >
              {formatPeso(totalSales)}
            </Typography>
            <Typography
              variant="h5"
              className="mt-4 text-PrimaryBackGround"
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
