// src/pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword, generateToken } from '../../../lib/auth';
import prisma from '../../../lib/prisma';
import { setCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée.' });
  }

  // On extrait directement les champs du body de la requête.
  const { nom, email, password, username, tlf, adresse, dateNaissance } =
    req.body;

  // Validation des données (à adapter selon vos besoins)
  if (!nom || !email || !password || !username) {
    return res.status(400).json({
      message:
        'Les champs nom, email, username et mot de passe sont requis.',
    });
  }
  // ... autres validations (par exemple, format de l'email, longueur du mot de passe, etc.) ...

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Un utilisateur avec cet email existe déjà.' });
    }

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: username as string },
    });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ message: 'Un utilisateur avec ce username existe déjà.' });
    }

    const hashedPassword = await hashPassword(password as string);

    const user = await prisma.user.create({
      data: {
        nom: nom as string,
        email: email as string,
        password: hashedPassword,
        username: username as string,
        tlf: tlf ? (tlf as string) : undefined,
        adresse: adresse ? (adresse as string) : undefined,
        dateNaissance: dateNaissance ? new Date(dateNaissance as string) : undefined,
      },
    });

    const token = generateToken(user);

    setCookie('auth', token, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      sameSite: 'strict',
      path: '/',
    });

    return res.status(201).json({
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
    return res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur." });
  }
}