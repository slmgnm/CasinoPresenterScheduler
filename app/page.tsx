"use client";
import axios from "axios";
import AddPresenter from "../app/components/AddPresenter";
import { useQuery } from "@tanstack/react-query";
import Presenter from "./components/Presenter";
import { GamePresenter } from "./types/presenter";
import { Suspense } from "react";
import Loading from "./components/Loading";
import Calendar from "./components/Calendar";
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
    <main className="">
      <Calendar />
    </main>
  );
}
