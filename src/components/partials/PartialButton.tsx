/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Card, Input, CardBody } from "@material-tailwind/react";
import "../../App.css";
export default function PartialButton({
  itemId,
  className,
  stock,
  maxStock,
  handlePartialBtn,
}: any) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const toggleOpen = () => setOpen(!open);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const handleAddBtn = async (itemId: string, count: number) => {
    await handlePartialBtn(itemId, Number(count));
    setOpen(false);
    setCount(0);
  };
  const handleChange = (e: any) => {
    const value = e.target.value;
    // binago ko na nag error sa deployment tangina
    setCount(value === "" ? 0 : Number(value));
  };
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
          <div className="flex items-center justify-center w-16">
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
                  <Input
                    type="number"
                    placeholder={undefined}
                    value={count}
                    onChange={handleChange}
                    crossOrigin={undefined}
                    containerProps={{ className: "min-w-[42px]" }}
                  />
                  <Button
                    className="symbol-button"
                    placeholder={undefined}
                    size="sm"
                    color="green"
                    onClick={increment}
                    disabled={stock === maxStock}
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
              onClick={() => handleAddBtn(itemId, count)}
            >
              ✔
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
