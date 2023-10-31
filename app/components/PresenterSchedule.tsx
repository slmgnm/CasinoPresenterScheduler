"use client";
import { useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import axios from "axios";
import { Dayjs } from "dayjs";
import Loading from "./Loading";
import Link from "next/link";

interface ScheduleProps {
  presenterId?: string | null;
}

export interface ScheduleItem {
  id: string;
  startTime: Date | string;
  endTime: Date | string;
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

function PresenterSchedule({ presenterId }: ScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleData>({});
  const [loading, setLoading] = useState(true);
  console.log("schedule", schedule);

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
      renderCell: (params: GridCellParams) => {
        return (
          <Link href={`/presenter/${params.row.gamePresenter.id}`}>
            {params.row.gamePresenter.name}
          </Link>
        );
      },
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
          return "Break";
        } else {
          return "On duty";
        }
      },
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <Loading />
      ) : (
        Object.keys(schedule).map((shiftName) => (
          <div key={shiftName}>
            <h1 className="b text-black p-6">{shiftName} Shift</h1>
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

export default PresenterSchedule;
