// pages/api/subsubcategories/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { subCategoryId } = req.query;

      if (!subCategoryId) {
        return res
          .status(400)
          .json({ message: "subCategoryId is required" });
      }

      const subsubcategories = await prisma.sousSousCategorie.findMany({
        where: {
          sousCategorieId: parseInt(subCategoryId as string, 10),
        },
      });

      res.status(200).json(subsubcategories);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message:
            "Erreur lors de la récupération des sous-sous-catégories.",
        });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}