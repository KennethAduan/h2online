import { useAppDispatch } from "../../../utils/redux/hooks";
import { clearOrder } from "../../../utils/redux/slice/orderSlice";
import { Button } from "@mui/material";

const ClearOrders = () => {
  const dispatch = useAppDispatch();
  const handleClearOrders = () => {
    dispatch(clearOrder());
  };
  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ width: 10 }}
        onClick={handleClearOrders}
      >
        Clear
      </Button>
    </div>
  );
};

export default ClearOrders;
