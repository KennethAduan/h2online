import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { Tooltip } from "@mui/material";
import GetLatestOrderDoc from "../../firebase/hooks/GetLatestOrderDoc";
import { toast } from "react-toastify";
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
const RecentOrderModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const latestOrderId = GetLatestOrderDoc();

  return (
    <div>
      <Tooltip title="Recent Order" placement="bottom">
        <Button variant="contained" onClick={handleOpen}>
          Recent Order
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {latestOrderId ? (
            <div className="flex justify-around">
              <h1 className="text-xl">Latest Order ID:</h1>
              <h1 className="text-xl">{latestOrderId}</h1>
            </div>
          ) : (
            <p>Loading latest order ID...</p>
          )}
          {/* Add cancel button and Copy Id button */}
          <div className="flex justify-around mt-8">
            <Button variant="contained" onClick={handleClose} color="error">
              CLose
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (latestOrderId) {
                  navigator.clipboard.writeText(latestOrderId);
                  toast.success("ID SUCCESSFULLY COPIED ", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }}
            >
              Copy ID
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RecentOrderModal;
