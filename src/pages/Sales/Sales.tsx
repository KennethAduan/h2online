/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerAndNavLayout } from "../../layout";
import { SalesCard } from "../../components";
import { Breadcrumbs } from "@material-tailwind/react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { FetchPurchaseOrder } from "../../firebase/hooks/FetchPurchaseOrder";
import { formatPeso } from "../../utils/Helpers";
import moment from "moment";
import firebase from "firebase/compat/app";
import ViewItemsDetails from "./View Items/ViewItemsDetails";
import DeleteItemOrder from "./Delete Item/DeleteItemOrder";
import {
  salesIcon,
  revenueIcon,
  monthlySalesIcon,
  totalSalesIcon,
} from "../../components/Icons";
import { COLORS } from "../../themes";
import GetAverageSales from "../../firebase/hooks/GetAverageSales";
import { useState } from "react";
import GetMonthlySales from "../../firebase/hooks/GetMonthlySales";
const Sales = () => {
  const [averageState, setAverage] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  GetAverageSales().then((average) => {
    // console.log(`Today's average sales is: ₱${average.toFixed(2)}`);
    setAverage(average);
  });
  GetMonthlySales().then((totalSales) => {
    // console.log(`Total sales for the current month: ${totalSales}`);
    setMonthlySales(totalSales);
    // You can further process the totalSales, send it in a response, etc.
  });
  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 250 },
    {
      field: "date",
      headerName: "Date",
      width: 250,
      renderCell: (params) => {
        const date = params.value
          ? (params.value as firebase.firestore.Timestamp).toDate()
          : null;
        return <p>{date ? moment(date).format("MMM D, YYYY") : ""}</p>;
      },
    },
    { field: "itemsNumber", headerName: "items", width: 250 },
    {
      field: "totalAmount",
      headerName: "Total",
      type: "number",
      width: 250,
      renderCell: (params) => {
        return <p>{formatPeso(params.value as number)}</p>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      width: 250,
      renderCell: (params: any) => {
        return (
          <div className="flex justify-center">
            <ViewItemsDetails id={params.row.id} />
            <DeleteItemOrder id={params.row.id} />
          </div>
        );
      },
    },
  ];

  const rows = FetchPurchaseOrder();

  // console.log(rows);
  return (
    <DrawerAndNavLayout>
      <Breadcrumbs className="mb-4 bg-black " placeholder={undefined}>
        <p className="font-bold text-white md:text-xl sm:text-lg lg:text-lg">
          SALES
        </p>
      </Breadcrumbs>
      <div className="grid items-center justify-center grid-cols-1 gap-4 mb-12 md:grid-cols-2 lg:grid-cols-4">
        <SalesCard
          titleSales="Average Sales"
          totalSales={averageState}
          icon={salesIcon}
        />
        <SalesCard
          titleSales="Monthly Sales"
          totalSales={monthlySales}
          icon={monthlySalesIcon}
        />
        <SalesCard titleSales="Revenue" totalSales={5000} icon={revenueIcon} />
        <SalesCard
          titleSales="Profit"
          totalSales={5000}
          icon={totalSalesIcon}
        />
      </div>
      {/* Data Table */}
      <div
        style={{
          maxHeight: "100%",
          width: "100%",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{ borderWidth: 1, borderColor: COLORS.primary }}
          getRowId={(row) => row.id}
          // disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          disableColumnSelector
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
              },
            },
          }}
          checkboxSelection
        />
      </div>
    </DrawerAndNavLayout>
  );
};

export default Sales;
