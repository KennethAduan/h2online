/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@material-tailwind/react";
import { Box, FormControlLabel } from "@mui/material";
import "../../App.css";
import Modal from "@mui/material/Modal";
import {
  PartialStockUpdate,
  UpdateMaxStocks,
} from "../../firebase/services/inventoryManager";
import { useState } from "react";
import { toast } from "react-toastify";
export const ReStockModal = ({
  itemId,
  stock,
  maxStock,
  handleClose,
  open,
}: {
  itemId: string;
  stock: number;
  maxStock: number;
  handleClose: () => void;
  open: boolean;
  handleAllBtn: (itemId: string, maxStock: number) => void;
}) => {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    border: "3px solid ${handleColor(stock)}",
    p: 2,
  };

  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setCount(value === "" ? 0 : Number(value));
  };

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const updateMaxStocks = async (itemId: string, maxStock: number) => {
    try {
      const maxStockUpdateResult = await UpdateMaxStocks(itemId, maxStock);
      console.log("maxStockUpdateResult", maxStockUpdateResult);
      if (maxStockUpdateResult !== undefined && maxStockUpdateResult !== null) {
        console.log("Stocks are now at max");
      } else {
        console.log("Update failed or no changes made");
      }
    } catch (error: any) {
      // Handle any errors that occur during the process
      console.error("An error occurred:", error);
      toast.error(error.message);
    }
  };

  const updateStocks = async (
    itemId: string,
    count: number,
    isChecked: boolean,
    stocks: number
  ) => {
    try {
      const partialStockUpdateResult = await PartialStockUpdate(
        itemId,
        Number(count)
      );
      console.log("partialStockUpdateResult", partialStockUpdateResult);
      if (
        partialStockUpdateResult !== undefined &&
        partialStockUpdateResult !== null
      ) {
        setCount(0);
      } else {
        console.log("Update failed or no changes made");
      }

      if (isChecked && stocks !== maxStock) {
        await updateMaxStocks(itemId, maxStock);
      }
    } catch (error: any) {
      // Handle any errors that occur during the process
      console.error("An error occurred:", error);
      toast.error(error.message);
    }
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex-col items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Re-stock
            </h3>
            <div className="flex-col">
              <div className="relative flex items-center w-full mt-3">
                <button
                  type="button"
                  id="decrement-button"
                  onClick={decrement}
                  data-input-counter-decrement="quantity-input"
                  className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-s-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  id="quantity-input"
                  value={count}
                  onChange={handleChange}
                  data-input-counter
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Quantity"
                  disabled={isChecked}
                ></input>
                <button
                  type="button"
                  id="increment-button"
                  onClick={increment}
                  data-input-counter-increment="quantity-input"
                  disabled={stock === maxStock || isChecked}
                  className="p-3 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 rounded-e-lg h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    disabled={stock === maxStock}
                    onChange={handleCheckboxChange}
                    crossOrigin={undefined}
                  />
                }
                defaultChecked
                label="Re-Stock All"
              />
              <div></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-6 space-x-2 rtl:space-x-reverse">
          <button
            onClick={handleClose}
            data-modal-hide="progress-modal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Close
          </button>
          <button
            onClick={() => updateStocks(itemId, count, isChecked, stock)}
            data-modal-hide="progress-modal"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </Box>
    </Modal>
  );
};
