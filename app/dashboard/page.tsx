import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import AddPresenter from "../components/AddPresenter";
import Calendar from "../components/Calendar";
import DataGrid from "../components/DataGrid";
import Schedule from "../components/Schedule";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main className="bg-white ">
      <h1 className="bg-black text-2xl font-bold">
        Welcome back {session?.user?.name}
      </h1>
      <div className="py-5">
        <AddPresenter />
      </div>
      <Schedule />
     
      <Calendar />
    </main>
  );
}
