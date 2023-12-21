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
const Sales = () => {
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
        return <p>{date ? moment(date).format("MM/DD/YY") : ""}</p>;
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
      <div className="flex justify-center mb-12 space-x-10">
        <SalesCard titleSales="Average Sales" totalSales={2000} />
        <SalesCard titleSales="Monthly Sales" totalSales={5000} />
      </div>
      {/* Data Table */}
      <div style={{ maxHeight: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
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
