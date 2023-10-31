"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import Schedule from "./Schedule"; // Import your Schedule component
import { Box, Typography } from "@mui/material";
import PresenterSchedule from "./PresenterSchedule";
interface CalendarProps {
  selectedPresenterName?: string;
}
export default function Calendar({ selectedPresenterName }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={selectedDate} onChange={handleDateChange} />
      </LocalizationProvider>
      <Typography variant="h3" gutterBottom>
        Schedule Generated for{" "}
        {selectedDate ? selectedDate.format("YYYY-MM-DD") : "No Date Selected"}
      </Typography>
      <Schedule selectedDate={selectedDate} />{" "}
    </Box>
  );
}
