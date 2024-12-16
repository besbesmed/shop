// src/pages/api/auth/logout.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée.' });
  }

  // Supprimez le cookie "auth"
  deleteCookie('auth', { req, res });

  return res.status(200).json({ message: 'Déconnexion réussie.' });
}