"use client";
import { GamePresenter } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import DeletePresenter from "./DeletePresenter";

import axios from "axios";
import Loading from "../components/Loading";
import Presenter from "../components/Presenter";

const fetchAllPresenters = async () => {
  const response = await axios.get("/api/presenters/getPresenters");
  return response.data;
};

export default function MyPosts(): JSX.Element {
  const { data, isLoading } = useQuery<GamePresenter[]>({
    queryFn: fetchAllPresenters,
    queryKey: ["getPresenters"],
  });
  if (isLoading) return <Loading />;
  // console.log("data in myPosts", data);
  return (
    <div>
      {data?.map((presenter) => (
        <DeletePresenter name={presenter.name} id={presenter.id} />
      ))}
    </div>
  );
}
