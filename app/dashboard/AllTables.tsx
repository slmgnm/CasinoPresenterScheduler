"use client";
import { Table } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import DeletePresenter from "./DeletePresenter";

import axios from "axios";
import Loading from "../components/Loading";

const fetchAllTables = async () => {
  const response = await axios.get("/api/tables/getTables");
  return response.data;
};

export default function MyPosts(): JSX.Element {
  const { data, isLoading } = useQuery<Table[]>({
    queryFn: fetchAllTables,
    queryKey: ["getTables"],
  });
  if (isLoading) return <Loading />;
  // console.log("data in myPosts", data);
  return (
    <div className="min-w-full">
      {data?.map((table) => (
        // <h1>{table.name}</h1>
        <DeletePresenter name={table.name} id={table.id} />
      ))}
    </div>
  );
}
