import { DrawerAndNavLayout } from "../../layout";
import { Breadcrumbs } from "@material-tailwind/react";
import { LayoutCard } from "../../components";
const PointOfSales = () => {
  return (
    <DrawerAndNavLayout>
      <Breadcrumbs className="mb-4 bg-black " placeholder={undefined}>
        <p className="font-bold text-white md:text-xl sm:text-lg lg:text-lg">
          POINT OF SALES
        </p>
      </Breadcrumbs>
      <div className="grid grid-cols-2">
        <div className="w-96">
          {/* For Refill */}
          <LayoutCard title="For refill">
            <></>
          </LayoutCard>
          {/* For Purchase */}
          <LayoutCard title="For purchase">
            <>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              nostrum voluptatibus vel itaque corrupti ipsam error eum doloribus
              tempore autem dolores quod delectus laboriosam aliquam dolorem,
              non quibusdam voluptas atque!
            </>
          </LayoutCard>
        </div>
        <div>
          <LayoutCard title="Order Summary">
            <>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              nostrum voluptatibus vel itaque corrupti ipsam error eum doloribus
              tempore autem dolores quod delectus laboriosam aliquam dolorem,
              non quibusdam voluptas atque!
            </>
          </LayoutCard>
        </div>
      </div>
    </DrawerAndNavLayout>
  );
};

export default PointOfSales;
