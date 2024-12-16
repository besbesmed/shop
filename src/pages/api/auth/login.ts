// src/pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { comparePassword, generateToken } from '../../../lib/auth';
import prisma from '../../../lib/prisma';
import { setCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée.' });
  }

  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "L'identifiant (email ou username) et le mot de passe sont requis." });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Identifiant ou mot de passe incorrect.' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: 'Identifiant ou mot de passe incorrect.' });
    }

    const token = generateToken(user);

    setCookie('auth', token, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 jour
      sameSite: 'strict',
      path: '/',
    });

    return res.status(200).json({
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la connexion.' });
  }
}