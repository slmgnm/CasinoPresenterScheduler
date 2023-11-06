"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridValueGetterParams, GridColDef } from "@mui/x-data-grid";
import { Dayjs } from "dayjs";
import axios from "axios";
import Loading from "./Loading";
import { Typography } from "@mui/material";

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
interface ScheduleProps {
  selectedDate: Dayjs | null;
  presenterId?: string | null;
}

const ScheduleGrids = ({ selectedDate }: ScheduleProps) => {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (selectedDate) {
      axios
        .get(
          `/api/schedule/generateSchedule?date=${selectedDate.format(
            "YYYY-MM-DD"
          )}`
        )

        .then((response) => {
          setScheduleData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching schedule data", error);
          setLoading(false);
        });
    }
  }, [selectedDate]);

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
          return `${formattedStartTime} Break`;
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
    <div className="max-w-4xl">
      {loading ? (
        <Loading />
      ) : (
        scheduleData.map((tableData, index) => (
          <div key={index}>
            <Typography variant="h4">{tableData.table.name}</Typography>
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
                  // initialState={{
                  //   pagination: {
                  //     paginationModel: {
                  //       pageSize: 6,
                  //     },
                  //   },
                  // }}
                  // pageSizeOptions={[6]}
                />
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};
export default ScheduleGrids;
