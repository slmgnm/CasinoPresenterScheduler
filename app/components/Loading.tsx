import React from "react";
import LogoSpinner from "../public/loading.svg";
import CircularProgress from "@mui/material/CircularProgress";
export default function Loading() {
  return (
    <main className="flex flex-col items-center py-8 px-8">
      <CircularProgress className="text-[#0D9488]" />

      <h1 className="">loading...</h1>
    </main>
  );
}
