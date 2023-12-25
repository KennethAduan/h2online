import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { DeleteItemPurchaseOrderById } from "../../../firebase/services/orderManager";
import GetLatestOrderDoc from "../../../firebase/hooks/GetLatestOrderDoc";
import { LoadingScreen } from "../../../components";
import { useState } from "react";
const RefundButton = () => {
  const orderId = GetLatestOrderDoc();
  const [loading, setLoading] = useState<boolean>(false);
  const handleRefund = () => {
    Swal.fire({
      title: "Are you sure refund?",
      text: `Are you sure you want to refund this order? order ID: ${orderId}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      setLoading(true);
      if (result.isConfirmed) {
        if (orderId) {
          await DeleteItemPurchaseOrderById(orderId);
          Swal.fire({
            title: "Success",
            text: "Refund has been made",
            icon: "success",
          });
        } else {
          console.error("No order ID to delete");
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <>
      <Button
        onClick={handleRefund}
        variant="outlined"
        fullWidth
        size="large"
        sx={{ width: 300 }}
      >
        REFUND
      </Button>
      <LoadingScreen loading={loading} />
    </>
  );
};

export default RefundButton;
