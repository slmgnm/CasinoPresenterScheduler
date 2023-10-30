import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "POST") {
      // const session = await getServerSession(req, res, authOptions);
      // if (!session)
      //   return res
      //     .status(401)
      //     .json({ message: "Please sign in to make a new post" });
     
      const { name, shift } = req.body;
     console.log("req.body",req.body);
      //get User
      // const prismaUser = await prisma.user.findUnique({
      //   where: { email: session?.user?.email || "" },
      // });
      
      // if (!prismaUser) {
      //   return res.status(403).json({ message: "User not found" });
      // }
      
      //create a game presenter
      try {
        const result = await prisma.gamePresenter.create({
          data: { name},
        });
        res.status(200).json(result);
      } catch (error) {
        res.status(403).json({ err: "Error occurred while creating a game presenter" });
      }
    }
  }
  
  