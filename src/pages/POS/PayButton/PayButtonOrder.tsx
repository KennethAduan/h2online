import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useAppSelector } from "../../../utils/redux/hooks";
import { AddPurchaseOrderFirebase } from "../../../firebase/services";
const PayButtonOrder = () => {
  // Redux Items
  const items = useAppSelector((state) => state.order.items);
  const { totalAmount } = useAppSelector((state) => state.order);
  const itemNumber = items.length;

  //   console.log("Items:", items);
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
        await AddPurchaseOrderFirebase(items, totalAmount, itemNumber);
        Swal.fire({
          title: "Success",
          text: "Payment has been made",
          icon: "success",
        });
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
