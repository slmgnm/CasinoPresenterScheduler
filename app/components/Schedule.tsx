"use client";
import { useState, useEffect } from "react";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import { idID } from "@mui/material/locale";
import { randomBytes, randomUUID } from "crypto";

interface ScheduleItem {
  id: string;

  startTime: Date;
  endTime: Date;
  gamePresenter: {
    id: string;
    name: string;
  };
  table: {
    id: string;
    name: string;
  } | null;
  breakSlot: boolean;
}

interface ScheduleData {
  [shiftName: string]: ScheduleItem[];
}

function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch schedule data from your API route
    axios.get("/api/schedule/generateSchedule").then((response) => {
      setSchedule(response.data);
      console.log("response.data from schedule", response.data);
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
      valueGetter: (params: GridValueGetterParams) => {
        if (params.row.breakSlot) {
          return "Break";
        } else {
          const isoDate = params.row.startTime;
          const date = new Date(isoDate);
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return formattedTime;
        }
      },
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 180,
      valueGetter: (params: GridValueGetterParams) => {
        if (params.row.breakSlot) {
          return "Break";
        } else {
          const isoDate = params.row.endTime;
          const date = new Date(isoDate);
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return formattedTime;
        }
      },
    },
    {
      field: "gamePresenter.name",
      headerName: "Game Presenter",
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.gamePresenter.name,
    },
    {
      field: "table.name",
      headerName: "Table",
      width: 150,
      valueGetter: (params: GridValueGetterParams) => {
        if (params.row.table) {
          return params.row.table.name;
        } else {
          return "N/A"; 
        }
      },
    },
    {
      field: "breakSlot",
      headerName: "Break Slot",
      width: 150,
      valueGetter: (params: GridValueGetterParams) => {
        if (params.row.breakSlot) {
          // If it's a break slot, display "Break" within the time row
          return "Break";
        } else {
          // If not a break slot, display an empty string
          return "";
        }
      },
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <div>Loading schedule...</div>
      ) : (
        Object.keys(schedule).map((shiftName) => (
          <div key={shiftName}>
            <h2>{shiftName} Shift</h2>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={schedule[shiftName]}
                columns={columns}
                checkboxSelection
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                getRowId={(row) => row.id}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Schedule;
