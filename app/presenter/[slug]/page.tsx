"use client";

import Calendar from "@/app/components/Calendar";
import PresenterSchedule from "@/app/components/PresenterSchedule";
import { DateCalendar } from "@mui/x-date-pickers";
import { GamePresenter } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { motion } from "framer-motion";
// import { useState } from "react";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/presenters/${slug}`);
  console.log("response.data", response.data);
  return response.data;
};

export default function PresenterDetail(url: URL) {
  const { data, isLoading } = useQuery<GamePresenter>({
    queryKey: ["detail-presenter"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  console.log("Data:", data);
  return (
    <div>
      <h1>{data?.name}</h1>
      presenterSchedule
      <Calendar />
    </div>
  );
}
