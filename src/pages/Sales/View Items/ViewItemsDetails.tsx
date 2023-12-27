/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModalComponent from "@/components/Modal/ModalComponent";
import { COLORS } from "@/themes";
import { formatPeso } from "@/utils/Helpers";
import { GetOrderItemsByOrderNumber } from "@/firebase/services/orderManager";
const Icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
    />
  </svg>
);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  // bgcolor: colors.primary,
  // borderColor: colors.tertiary,
  border: "3px solid",
  borderRadius: 2,
  p: 3,
};

const TableHeadStyle = {
  backgroundColor: COLORS.primary,
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
  padding: "1rem",
};

const TableRowStyle = {
  // backgroundColor: COLORS.secondary,
  color: "white",
  fontSize: 14,
  fontWeight: "bold",
  padding: "1rem",
};

const ViewItemsDetails = (id: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await GetOrderItemsByOrderNumber(id.id);
      setRows(data);
    };
    fetchItems();
  }, [id]);

  // console.log(rows);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <ModalComponent
        buttonName={"View Items"}
        icon={Icon}
        variant={"text"}
        customStyle={style}
        isOpen={isModalOpen}
        onClose={handleCancel}
        onOpen={handleOpenModal}
      >
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 400, backgroundColor: COLORS.primary }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={TableHeadStyle} align="center">
                  Item
                </TableCell>
                <TableCell align="center" style={TableHeadStyle}>
                  Quantity
                </TableCell>
                <TableCell align="center" style={TableHeadStyle}>
                  Service Type
                </TableCell>
                <TableCell align="center" style={TableHeadStyle}>
                  Unit Price
                </TableCell>
                <TableCell align="center" style={TableHeadStyle}>
                  Sub Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any, index: any) => (
                // Render each row here
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" style={TableRowStyle}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center" style={TableRowStyle}>
                    {row.quantity}
                  </TableCell>
                  <TableCell align="center" style={TableRowStyle}>
                    {row.serviceType}
                  </TableCell>
                  <TableCell align="center" style={TableRowStyle}>
                    {formatPeso(row.unitPrice)}
                  </TableCell>
                  <TableCell align="center" style={TableRowStyle}>
                    {formatPeso(row.subPrice)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ModalComponent>
    </div>
  );
};

export default ViewItemsDetails;
