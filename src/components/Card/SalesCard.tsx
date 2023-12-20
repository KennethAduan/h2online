import { Card, CardBody, Typography } from "@material-tailwind/react";
interface SalesCardProps {
  titleSales: string;
  totalSales: number;
}

const SalesCard = ({ titleSales, totalSales }: SalesCardProps) => {
  return (
    <Card className="h-48 mt-6 w-96" placeholder={undefined}>
      <CardBody placeholder={undefined}>
        <div className="mt-10">
          <Typography
            variant="h5"
            color="gray"
            className="mb-2"
            placeholder={undefined}
          >
            {titleSales}
          </Typography>
          <Typography variant="h3" color="black" placeholder={undefined}>
            ₱ {totalSales}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesCard;
