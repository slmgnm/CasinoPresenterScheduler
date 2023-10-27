import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Logged from "./Logged";

// import Logo from "../../public/logo.svg"


export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  return (
    <nav className="flex justify-between items-center py-8">
    
      <Link href={"/"}>
        <h1>home</h1>
        <div className="">
        {/* <Logo
        /> */}
        
        </div>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image || ""} />}
      </ul>
    </nav>
  );
}