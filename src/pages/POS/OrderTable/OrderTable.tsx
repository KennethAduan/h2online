import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const tableCellHeadStyle = {
  fontWeight: "bold",
  color: "white",
  backgroundColor: "#1976D2",
  fontSize: 20,
};
const OrderTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              Sub Price
            </TableCell>
            {/* Changed alignment to center */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
