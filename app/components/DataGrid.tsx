"use client";
import { Box } from "@mui/material";
// import {  GridColDef, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid';
import {
  DataGrid as Grid,
  GridColDef,
  GridRowsProp,
  GridValueGetterParams,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows: GridRowsProp = [
  { id: 1, firstName: "Hello", lastName: "World" },
  { id: 2, firstName: "DataGridPro", lastName: "is Awesome" },
  { id: 3, firstName: "MUI", lastName: "is Amazing" },
];

export default function DataGrid() {
  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <Grid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
