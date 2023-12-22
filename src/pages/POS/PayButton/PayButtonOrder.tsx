import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useAppSelector, useAppDispatch } from "../../../utils/redux/hooks";
import { AddPurchaseOrderFirebase } from "../../../firebase/services";
import { clearOrder } from "../../../utils/redux/slice/orderSlice";

const PayButtonOrder = () => {
  // Redux Items

  const items = useAppSelector((state) => state.order.items);
  const { totalAmount } = useAppSelector((state) => state.order);
  // const { isSuccessOrder } = useAppSelector((state) => state.user);
  const itemNumber = items.length;
  const dispatch = useAppDispatch();
  // console.log(isSuccessOrder);
  //   console.log("Items:", items);

  const handleAddPurchaseOrder = async () => {
    const result = await AddPurchaseOrderFirebase(items, totalAmount, itemNumber, dispatch);
    return result;
  };

  const handlePay = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Please confirm to proceed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (items.length === 0) {
          Swal.fire({
            title: "Error",
            text: "Please add orders to your account",
            icon: "error",
          });
          return;
        }
        const isSuccess = await handleAddPurchaseOrder();
        console.log("Is Success: " + isSuccess);
        // Need dito ma fix yung stocks
        if (isSuccess) {
          console.log("Success");
          Swal.fire({
            title: "Success",
            text: "Payment has been made",
            icon: "success",
          });
          dispatch(clearOrder());
        } else {
          console.log("Failed"); 
          Swal.fire({
            title: "Error",
            text: "Payment has not been made",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <div>
      <Button
        color="blue"
        placeholder={undefined}
        size="lg"
        fullWidth
        className="w-96"
        onClick={handlePay}
      >
        PAY
      </Button>
    </div>
  );
};

export default PayButtonOrder;
