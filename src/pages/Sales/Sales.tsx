import { DrawerAndNavLayout } from "../../layout";
import { SalesCard } from "../../components";
import { Breadcrumbs } from "@material-tailwind/react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
const Sales = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 250 },
    { field: "date", headerName: "Date", width: 250 },
    { field: "items", headerName: "items", width: 250 },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      width: 250,
    },
    {
      field: "service",
      headerName: "Service",
      type: "number",
      width: 250,
    },
  ];

  const rows = [
    {
      id: 1122424,
      date: "12/12/2021",
      items: 2,
      total: 100,
      service: "Refill",
    },
    {
      id: 1124512242,
      date: "12/12/2021",
      items: 2,
      total: 100,
      service: "Refill",
    },
    {
      id: 11242124,
      date: "12/12/2021",
      items: 2,
      total: 100,
      service: "Refill",
    },
  ];
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
