import { clearOrder } from "@/utils/redux/slice/orderSlice";
import { useAppDispatch } from "@/utils/redux/hooks";
import { Button } from "@mui/material";

const ClearOrders = () => {
  const dispatch = useAppDispatch();
  const handleClearOrders = () => {
    dispatch(clearOrder());
  };
  return (
    <>
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ width: 10 }}
        onClick={handleClearOrders}
      >
        Clear
      </Button>
    </>
  );
};

export default ClearOrders;
