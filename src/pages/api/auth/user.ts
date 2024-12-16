// pages/api/auth/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée.' });
  }

  const token = req.cookies.auth;

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé. Token manquant.' });
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Non autorisé. Token invalide.' });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        nom: true,
        email: true,
        username: true,
        role: true,
        // Ajoutez d'autres champs que vous souhaitez récupérer
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération des informations de l\'utilisateur.' });
  }
}