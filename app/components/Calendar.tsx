"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import Schedule from "./Schedule"; // Import your Schedule component
import { Typography } from "@mui/material";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs("2022-04-17")
  );

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={selectedDate} onChange={handleDateChange} />
      </LocalizationProvider>
      <h1 className="text-black">
        Schedule Generated for{" "}
        {selectedDate ? selectedDate.format("YYYY-MM-DD") : "No Date Selected"}
      </h1>
      <Typography variant="h3" gutterBottom>
      Schedule Generated for{" "}
        {selectedDate ? selectedDate.format("YYYY-MM-DD") : "No Date Selected"}
      </Typography>
      <Schedule selectedDate={selectedDate} />{" "}
      {/* Pass the selected date as a prop */}
    </div>
  );
}
