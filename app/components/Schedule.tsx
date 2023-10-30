"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch schedule data from your API route
    axios.get("/api/schedule/generateSchedule").then((response) => {
      setSchedule(response.data);
      console.log("resposne.data", response.data);
      setLoading(false);
    });
  }, []);
  const getRowId = (row: any) => row.startTime;

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 180,
      valueGetter: (params: any) => {
        const isoDate = params.row.startTime;
        const date = new Date(isoDate);
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return formattedTime;
      },
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 180,
      valueGetter: (params: any) => {
        const isoDate = params.row.startTime;
        const date = new Date(isoDate);
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return formattedTime;
      },
    },
    {
      field: "gamePresenter.name",
      headerName: "Game Presenter",
      width: 200,
      valueGetter: (params: any) => params.row.gamePresenter.name,
    },
    {
      field: "table.name",
      headerName: "Table",
      width: 150,
      valueGetter: (params: any) => params.row.table.name,
    },
    { field: "breakSlot", headerName: "Break Slot", width: 150 },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      {loading ? (
        <div>Loading schedule...</div>
      ) : (
        <DataGrid
          rows={schedule}
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
          getRowId={getRowId}
        />
      )}
    </div>
  );
}

export default Schedule;
