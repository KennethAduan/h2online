/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { UpdateMaxStocks } from "../../firebase/services/inventoryManager";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import TimeProgressBar from "../ProgressBar/TimeProgressBar";
import React from "react";
import { ReStockModal, CountDownTimerV2 } from "../../components/index";
import StockProgressBar from "../ProgressBar/StockProgressBar";
import { calculateValueFromPercentage } from "@/utils/Helpers/ItemCardHelpers";
import { useAppSelector } from "@/utils/redux/hooks";
interface ItemCardProps {
  name: string;
  price: number;
  description?: string;
  image: string;
  category?: string;
  color?: string;
  status?: string;
  stock?: number;
  maxStock?: number;
  itemId: string;
}

function ItemCard({
  name = "Demo",
  price,
  stock,
  image,
  status,
  maxStock,
  itemId,
}: ItemCardProps) {
  const card1Ref: any = useRef(null);
  const card2Ref: any = useRef(null);
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    if (card1Ref.current && card2Ref.current) {
      const card1Size = card1Ref.current.getBoundingClientRect();
      card2Ref.current.style.width = `${card1Size.width}px`;
      card2Ref.current.style.height = `${card1Size.height}px`;
    }
  }, []);

  const HandleColor = (newStock: any) => {
    const medStock = calculateValueFromPercentage(50, maxStock) || 0;
    const lowStock = calculateValueFromPercentage(10, maxStock) || 0;
    const percentage =
      useAppSelector((state) => state.countdown.timePercentages[itemId]) || 0;
    let color = "bg-green-500";
    if (
      itemId === "Membrane123" ||
      itemId === "SedimentFilter123" ||
      itemId === "FilterSet123" ||
      itemId === "SolarSalt123"
    ) {
      if (percentage <= 25) {
        color = "bg-red-500";
      } else if (percentage <= 50) {
        color = "bg-yellow-500";
      }
    }

    if (
      itemId === "RoundGallon123" ||
      itemId === "BigCapSeal123" ||
      itemId === "SquareGallon123" ||
      itemId === "350ml123"
    ) {
      if (newStock <= lowStock) {
        // Check for low stock first
        color = "bg-red-500";
      } else if (newStock <= medStock) {
        // Then check for medium stock
        color = "bg-yellow-500";
      }
    }
    return color;
  };

  const handleAllBtn = async (itemId: string, maxStock: number) => {
    // Confirm before proceeding
    try {
      const willAdd = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true, // Show cancel button
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!",
      });

      if (willAdd.isConfirmed) {
        const result = await UpdateMaxStocks(itemId, maxStock);
        if (result !== undefined && result !== null) {
          // Update was successful
          console.log("Stocks are now at max");
          await Swal.fire("Stocks are now at max", "", "success");
        } else {
          // Handle case where update is not successful
          console.log("Update failed or no changes made");
        }
      } else {
        // User did not confirm
        console.log("No change in stock");
        await Swal.fire("No change in stock", "", "info");
      }
    } catch (error: any) {
      // Handle any errors that occur during the process
      console.error("An error occurred:", error);
      await Swal.fire("An error occurred", error.message, "error");
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log("itemId", itemId);

  return (
    <>
      <div onClick={handleOpen} className="relative mx-12 my-32 h-96 w-96">
        {/* <!-- Red Card (Back Card) --> */}
        <div className="absolute flex items-center justify-center w-full h-full right-3">
          <Card
            ref={card2Ref}
            placeholder={undefined}
            className={`absolute top-0 w-96 ${HandleColor(stock)}`}
          >
            <CardHeader
              placeholder={undefined}
              floated={false}
              className="flex items-center justify-center h-60"
            >
              <img className="h-auto max-w-full" src={image} alt="Item Image" />
            </CardHeader>
          </Card>
        </div>

        <Card
          ref={card1Ref}
          placeholder={undefined}
          className="absolute top-0 bg-gray-100 hover:bg-white"
        >
          <CardHeader
            placeholder={undefined}
            floated={false}
            className="flex items-center justify-center overflow-hidden h-60"
          >
            <img
              className="object-contain object-center w-[340px] h-full"
              src={image}
              alt="profile-picture"
            />
          </CardHeader>
          <CardBody placeholder={undefined}>
            <div className="flex justify-between">
              <Typography
                placeholder={undefined}
                color="blue-gray"
                className="font-medium"
                textGradient
              >
                Item:
              </Typography>
              <Typography
                placeholder={undefined}
                className="font-black text-black"
                textGradient
              >
                {name}
              </Typography>
            </div>
            {stock !== undefined && stock > 0 && (
              <div className="flex justify-between">
                {itemId === "RoundGallon123" ||
                itemId === "BigCapSeal123" ||
                itemId === "SquareGallon123" ||
                itemId === "350ml123" ? (
                  <>
                    <Typography
                      placeholder={undefined}
                      color="blue-gray"
                      className="font-medium"
                      textGradient
                    >
                      Stock (max. {maxStock} pcs)
                    </Typography>
                    <Typography
                      placeholder={undefined}
                      className="font-black text-black"
                      textGradient
                    >
                      {stock}
                    </Typography>
                  </>
                ) : null}
              </div>
            )}
            <div className="flex justify-between">
              <Typography
                placeholder={undefined}
                color="blue-gray"
                className="font-medium"
                textGradient
              >
                Unit Price:
              </Typography>
              <Typography
                placeholder={undefined}
                className="font-black text-black"
                textGradient
              >
                {price}
              </Typography>
            </div>
            {stock !== undefined && stock > 0 && (
              <div className="flex justify-between">
                <Typography
                  placeholder={undefined}
                  color="blue-gray"
                  className="font-medium"
                  textGradient
                >
                  Status:
                </Typography>
                <Typography
                  placeholder={undefined}
                  className="font-black text-black"
                  textGradient
                >
                  {status || "Not Available"}
                </Typography>
              </div>
            )}

            {(itemId === "Membrane123" ||
              itemId === "SedimentFilter123" ||
              itemId === "FilterSet123" ||
              itemId === "SolarSalt123") && (
              <div className="flex items-center justify-between mx-2 my-2">
                <AvTimerIcon fontSize="large" className="w-full" />
                <CountDownTimerV2 itemId={itemId} resetFlag={resetFlag} />
              </div>
            )}
          </CardBody>
          <CardFooter
            placeholder={undefined}
            className="flex items-center justify-between pt-0"
          >
            <Typography
              placeholder={undefined}
              color="blue-gray"
              className="mr-2 font-medium"
              variant="h6"
            >
              Status:
            </Typography>
            {(itemId === "350ml123" ||
              itemId === "RoundGallon123" ||
              itemId === "BigCapSeal123" ||
              itemId === "SquareGallon123") &&
              stock !== undefined &&
              stock > 0 && (
                <StockProgressBar stock={stock} maxStock={maxStock} />
              )}

            {(itemId === "Membrane123" ||
              itemId === "SedimentFilter123" ||
              itemId === "FilterSet123" ||
              itemId === "SolarSalt123") && <TimeProgressBar itemId={itemId} />}
          </CardFooter>
        </Card>
      </div>

      <ReStockModal
        resetFlag={resetFlag}
        setResetFlag={setResetFlag}
        itemId={itemId}
        stock={stock}
        maxStock={maxStock}
        handleClose={handleClose}
        open={open}
        handleAllBtn={handleAllBtn}
        isTimer={
          itemId === "Membrane123" ||
          itemId === "SedimentFilter123" ||
          itemId === "FilterSet123" ||
          itemId === "SolarSalt123"
            ? true
            : false
        }
      />
    </>
  );
}

export default ItemCard;
