import { Card, CardBody, CardFooter } from "@material-tailwind/react";
interface LayoutCardProps {
  title: string;
  children: React.ReactNode;
}

const LayoutCard: React.FC<LayoutCardProps> = ({ title, children }) => {
  // console.log(`LayoutCard Render`);
  return (
    <>
      <Card
        className="w-auto mt-6 hover:bg-gray-100 hover:shadow-md"
        placeholder={undefined}
      >
        <CardBody placeholder={undefined}>
          <h1 className="text-2xl font-bold text-AccentFontColor">{title}</h1>
          <hr />
          {/* Horizontal Line */}
          <div>{children}</div>
        </CardBody>
        <CardFooter className="pt-0" placeholder={undefined}>
          {/* <Button placeholder={undefined}>Read More</Button> */}
          <></>
        </CardFooter>
      </Card>
    </>
  );
};

export default LayoutCard;
