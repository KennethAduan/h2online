/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Card, Typography, CardBody } from "@material-tailwind/react";
import "../../App.css";
export default function PartialButton({ className }: any) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const toggleOpen = () => setOpen(!open);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="relative inline-block">
      {" "}
      {/* This div is necessary to position the modal right below the button */}
      <Button
        className={`${className}`}
        placeholder={undefined}
        size="sm"
        onClick={toggleOpen}
      >
        Partial
      </Button>
      {open && ( // This conditional rendering will show the modal-like component
        <div className="absolute z-10 -translate-y-[-20] mt-2 shadow-xl w-full">
          {" "}
          {/* This div positions the modal right below the button */}
          <Card placeholder={undefined}>
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
        </div>
      )}
    </div>
  );
}
