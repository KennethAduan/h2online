import { Card, CardBody, CardFooter } from "@material-tailwind/react";
interface LayoutCardProps {
  title: string;
  children: React.ReactNode;
}

const LayoutCard: React.FC<LayoutCardProps> = ({ title, children }) => {
  return (
    <Card className="w-auto mt-6" placeholder={undefined}>
      <CardBody placeholder={undefined}>
        <h1 className="text-2xl text-AccentFontColor">{title}</h1>
        <hr />
        {/* Horizontal Line */}
        <div>{children}</div>
      </CardBody>
      <CardFooter className="pt-0" placeholder={undefined}>
        {/* <Button placeholder={undefined}>Read More</Button> */}
        <></>
      </CardFooter>
    </Card>
  );
};

export default LayoutCard;
