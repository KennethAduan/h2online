/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Card, Typography, CardBody } from "@material-tailwind/react";
import "../../App.css";
export default function PartialButton({ itemId, className , stock, maxStock, handlePartialBtn}: any) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const toggleOpen = () => setOpen(!open);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const handleAddBtn = async (itemId: string, count: number) => {
    await handlePartialBtn(itemId, count);
    setOpen(false);
    setCount(0);
  }

  return (
    <div className="relative inline-block">
      {" "}
      {/* This div is necessary to position the modal right below the button */}
      <Button
        className={`${className}`}
        placeholder={undefined}
        size="sm"
        onClick={toggleOpen}
        disabled = {stock === maxStock}
      >
        Partial
      </Button>
      {open && ( // This conditional rendering will show the modal-like component
        <div className="absolute z-10 -translate-y-[-20] mt-2 shadow-xl w-full">
          {" "}
          {/* This div positions the modal right below the button */}
          <div className="flex justify-center items-center">
          <Card placeholder={undefined} >
            <CardBody placeholder={undefined} className="partial-button">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  className="symbol-button"
                  placeholder={undefined}
                  size="sm"
                  color="red"
                  onClick={decrement}
                >
                  &ndash;
                </Button>
                <Typography placeholder={undefined}>{count}</Typography>
                <Button
                  className="symbol-button"
                  placeholder={undefined}
                  size="sm"
                  color="green"
                  onClick={increment}
                >
                  +
                </Button>
               
              </div>
            </CardBody>
        
          </Card>
             <Button
                  className="symbol-button w-11"
                  placeholder={undefined}
                  size="sm"
                  color="green"
                  onClick={()=>handleAddBtn(itemId, count)}
                >
                    ✔
                </Button>
          </div>
       
       
        </div>
      )}
    </div>
  );
}
