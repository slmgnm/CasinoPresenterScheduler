import prisma from "../../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    // Change the HTTP method to "PUT" for editing
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please sign in to edit." });
    }

    const { id, name, description } = req.body; // Update this to include the fields you want to edit

    try {
      const updatedPresenter = await prisma.gamePresenter.update({
        where: {
          id: id,
        },
        data: {
          name, // Update the fields you want to edit

          // Add more fields as needed
        },
      });

      res.status(200).json(updatedPresenter);
    } catch (err) {
      res
        .status(403)
        .json({ error: "An error occurred while editing the presenter." });
    }
  }
}
