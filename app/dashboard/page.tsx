import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import AddPresenter from "../components/AddPresenter";
import AllPresenters from "./AllPresenters";
import AllTables from "./AllTables";
import { Typography } from "@mui/material";
import AddGameTable from "../components/AddTable";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className=" ">
      <Typography className=" text-2xl font-bold text-white">
        Welcome back {session?.user?.name}
      </Typography>
      <div className="py-5 flex flex-col items-center justify-center">
        <AddPresenter />
        <AllPresenters />
        <AddGameTable />
        <AllTables />
      </div>

   
    </div>
  );
}
