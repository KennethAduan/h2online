import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
interface ProductCardProps {
  imageUrl: string;
  productName: string;
  productPrice: number;
}
const ProductCard = ({
  imageUrl,
  productName,
  productPrice,
}: ProductCardProps) => {
  return (
    <Card className="w-96" placeholder={undefined}>
      <CardHeader floated={false} className="h-80" placeholder={undefined}>
        <img src={imageUrl} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center" placeholder={undefined}>
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
        >
          {productName}
        </Typography>
        <Typography
          color="blue-gray"
          className="font-medium"
          textGradient
          placeholder={undefined}
        >
          {productPrice}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
