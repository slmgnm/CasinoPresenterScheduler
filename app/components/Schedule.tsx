import React, { useState, useEffect } from "react";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";

export interface Shift {
  id: string | null;
  name: string | null;
  slots: Slot[];
}

export interface Slot {
  id: number;
  startTime: string;
  endTime: string;
  gamePresenter: {
    name: string;
  };
  table: {
    name: string;
  };
  breakSlot: boolean;
}

interface ScheduleData {
  table: {
    name: string;
  };
  shifts: Shift[];
}

const ScheduleGrids = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

  useEffect(() => {
    fetch("/api/schedule/generateSchedule")
      .then((response) => response.json())
      .then((data) => {
        setScheduleData(data);
      })
      .catch((error) => {
        console.error("Error fetching schedule data", error);
      });
  }, []);

  const columns = [
    {
      field: "table.name",
      headerName: "Table",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.table.name,
    },
    {
      field: "timeRange",
      headerName: "Time",
      width: 180,
      valueGetter: (params: GridValueGetterParams) => {
        if (params.row?.breakSlot) {
          return "Break";
        } else {
          const startTime = new Date(params.row?.startTime);
          const endTime = new Date(params.row?.endTime);
          const formattedStartTime = startTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const formattedEndTime = endTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${formattedStartTime} - ${formattedEndTime}`;
        }
      },
    },
    {
      field: "gamePresenter.name",
      headerName: "Game Presenter",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.gamePresenter?.name || "",
    },
  ];

  return (
    <div>
      {scheduleData.map((tableData, index) => (
        <div key={index}>
          <h2>{tableData.table.name}</h2>
          {tableData.shifts.map((shift, shiftIndex) => (
            <div key={shiftIndex}>
              <h3>{shift.name} Shift</h3>
              <DataGrid
                rows={tableData.shifts
                  .filter((s) => s.name === shift.name)
                  .flatMap((s) =>
                    s.slots.map((slot) => ({
                      ...slot,
                      shift: shift.name,
                    }))
                  )}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScheduleGrids;
