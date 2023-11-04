"use client";
import { GamePresenter } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import DeletePresenter from "../components/DeletePresenter";

import axios from "axios";
import Loading from "../components/Loading";
import Presenter from "../components/Presenter";
import EditPresenter from "../components/EditPresenter";

const fetchAllPresenters = async () => {
  const response = await axios.get("/api/presenters/getPresenters");
  return response.data;
};

export default function AllPresenters(): JSX.Element {
  const { data, isLoading } = useQuery<GamePresenter[]>({
    queryFn: fetchAllPresenters,
    queryKey: ["presenters"],
  });
  if (isLoading) return <Loading />;
  // console.log("data in myPosts", data);
  return (
    <div className="min-w-full">
      {data?.map((presenter: any) => (
        <Presenter name={presenter.name} id={presenter.id} />
      ))}
    </div>
  );
}
