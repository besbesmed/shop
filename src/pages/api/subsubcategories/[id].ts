// pages/api/subsubcategories/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const subsubcategory = await prisma.sousSousCategorie.findUnique({
        where: { id: Number(id) },
      });
      if (subsubcategory) {
        res.status(200).json(subsubcategory);
      } else {
        res
          .status(404)
          .json({
            message: `Sous-sous-catégorie avec l'ID ${id} introuvable.`,
          });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message:
            "Erreur lors de la récupération de la sous-sous-catégorie.",
        });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}