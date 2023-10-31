import type { NextApiRequest, NextApiResponse } from "next";

// import { AuthOptions } from "next-auth";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const result = await prisma.table.findMany({
        // include: {
        //   user: true,
        //   comments: true,
        // },
        // orderBy: {
        //   createdAt: "desc",
        // },
      });
      console.log("result in getTables",result);
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ err: "Error fetching tables" });
    }
  }
}
