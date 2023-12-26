/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { GetOrderItemsByOrderNumber } from "../../../firebase/services/orderManager";
import { LoadingScreen } from "../../../components";
import { useState, useEffect } from "react";
import { RefundPurchaseOrderFirebase } from "../../../firebase/services/orderManager";
import { toast } from "react-toastify";
import { Box, Modal, TextField } from "@mui/material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};
const RefundButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<any>([]);
  const [orderId, setOrderId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchItems = async () => {
      if (orderId) {
        const data = await GetOrderItemsByOrderNumber(orderId);
        setOrderData(data);
      }
    };
    fetchItems();
  }, [orderId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(event.target.value);
  };
  const handleRefund = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure refund?",
      text: orderId
        ? `Are you sure you want to refund this order? order ID: ${orderId}`
        : "No Current Order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      setLoading(true);
      if (result.isConfirmed) {
        if (orderId) {
          await RefundPurchaseOrderFirebase(orderData, orderId);

          setLoading(false);
        } else {
          setLoading(false);
          toast.error("No order to delete ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
        onClick={handleOpen}
        variant="outlined"
        fullWidth
        size="large"
        sx={{ width: 300 }}
      >
        REFUND
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <TextField
              label="ORDER ID"
              fullWidth
              value={orderId}
              onChange={handleChange}
            />
          </div>
          {/* Add cancel button and Copy Id button */}
          <div className="flex justify-around mt-8">
            <Button variant="contained" onClick={handleClose} color="error">
              CLose
            </Button>
            <Button variant="contained" onClick={handleRefund}>
              Refund
            </Button>
          </div>
        </Box>
      </Modal>
      <LoadingScreen loading={loading} />
    </>
  );
};

export default RefundButton;
