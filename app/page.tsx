"use client";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import { GamePresenter } from "./types/presenter";
import { Suspense } from "react";
import Loading from "./components/Loading";
import Calendar from "./components/Calendar";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

const allPresenters = async () => {
  const response = await axios.get("/api/presenters/getPresenters");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<GamePresenter[]>({
    queryFn: allPresenters,
    queryKey: ["presenters"],
  });
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <main className="flex justify-center	">
      <ThemeProvider theme={theme}>
        <Calendar />
      </ThemeProvider>
    </main>
  );
}
