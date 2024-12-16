// src/pages/api/products/index.ts (User App)
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Ajoutez ici la logique pour gérer le filtrage, le tri et la pagination en fonction des paramètres de requête
      const products = await prisma.produit.findMany();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la récupération des produits.' });
    }
  } else {
    return res.status(405).json({ message: 'Méthode non autorisée.' });
  }
}