import { Card, CardBody } from "@material-tailwind/react";

const formatPeso = (amount: number) => {
  return `₱ ${amount.toFixed(2)}`;
};
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
    <Card className="w-48" placeholder={undefined}>
      <CardBody className="text-center" placeholder={undefined}>
        <img
          src={imageUrl}
          className="rounded-lg w-44 h-44"
          alt="profile-picture"
        />
        <div className="mt-4">
          <h1 className="text-sm font-bold text-left text-AccentFontColor">
            {productName}
          </h1>
          <h1 className="text-sm font-bold text-left text-AccentFontColor">
            {formatPeso(productPrice)}
          </h1>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
