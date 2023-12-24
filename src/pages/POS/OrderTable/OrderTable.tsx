import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector, useAppDispatch } from "../../../utils/redux/hooks";

import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../../../utils/redux/slice/orderSlice";
import { formatPeso } from "../../../utils/Helpers";
import { COLORS } from "../../../themes";

const tableCellHeadStyle = {
  fontWeight: "bold",
  color: "white",
  backgroundColor: COLORS.primary,
  fontSize: 20,
};

const tableCellRowStyle = {
  fontWeight: "bold",
  fontSize: 18,
};

const OrderTable = () => {
  const items = useAppSelector((state) => state.order.items);
  const dispatch = useAppDispatch();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, width: "100%" }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#1976D2" }}>
            {/* Changed color to blue */}
            <TableRow>
              <TableCell align="center" style={tableCellHeadStyle}>
                Name
              </TableCell>
              {/* Changed alignment to center */}
              <TableCell align="center" style={tableCellHeadStyle}>
                Quantity
              </TableCell>
              {/* Changed alignment to center */}
              <TableCell align="center" style={tableCellHeadStyle}>
                Unit Price
              </TableCell>
              {/* Changed alignment to center */}
              <TableCell align="center" style={tableCellHeadStyle}>
                Sub Total
              </TableCell>
              {/* Changed alignment to center */}
              <TableCell align="center" style={tableCellHeadStyle}>
                Total Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={tableCellRowStyle}
                >
                  <div className="grid grid-cols-2">
                    <button onClick={() => dispatch(removeItem(row.name))}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        color="red"
                        className="w-6 h-6 mt-2 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <p className="mt-2 ml-[-60px]"> {row.name}</p>
                  </div>
                </TableCell>
                <TableCell align="center" style={tableCellRowStyle}>
                  <div className="grid items-center grid-cols-3 gap-2">
                    <button
                      className="flex items-center justify-center w-8 h-8 border-2 rounded-full text-primary border-SecondaryBackGround" // Adjusted classes for a circular button
                      onClick={() => dispatch(decreaseQuantity(row.id))}
                    >
                      -
                    </button>
                    <div>{row.quantity}</div>
                    <button
                      className="flex items-center justify-center w-8 h-8 border-2 rounded-full text-primary border-SecondaryBackGround" // Adjusted classes for a circular button
                      onClick={() => dispatch(increaseQuantity(row.id))}
                    >
                      +
                    </button>
                  </div>
                </TableCell>
                <TableCell align="center" style={tableCellRowStyle}>
                  {formatPeso(row.unitPricePurchase)}
                </TableCell>
                <TableCell align="center" style={tableCellRowStyle}>
                  {formatPeso(row.priceTaxPurchase)}
                </TableCell>
                <TableCell align="center" style={tableCellRowStyle}>
                  {formatPeso(row.subPrice)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderTable;
