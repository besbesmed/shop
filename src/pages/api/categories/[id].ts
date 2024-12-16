// pages/api/categories/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const category = await prisma.categorie.findUnique({
        where: { id: Number(id) },
      });
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: `Catégorie avec l'ID ${id} introuvable.` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}