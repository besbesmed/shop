// pages/api/subcategories/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { categoryId } = req.query;

      if (!categoryId) {
        return res
          .status(400)
          .json({ message: "categoryId is required" });
      }

      const subcategories = await prisma.sousCategorie.findMany({
        where: {
          categorieId: parseInt(categoryId as string, 10),
        },
      });

      res.status(200).json(subcategories);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des sous-catégories." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}