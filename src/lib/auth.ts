// src/lib/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Définissez une clé secrète forte dans votre fichier .env
const SALT_ROUNDS = 10;

/**
 * Hashes a password using bcrypt.
 * @param password The password to hash.
 * @returns The hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Compares a plain password with a hashed password.
 * @param password The plain password.
 * @param hashedPassword The hashed password.
 * @returns True if the passwords match, false otherwise.
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generates a JWT token for a user.
 * @param user The user object.
 * @returns The JWT token.
 */
export function generateToken(user: User): string {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' }); // Le token expire après 24 heures
}

/**
 * Verifies a JWT token.
 * @param token The JWT token to verify.
 * @returns The decoded token payload if the token is valid, null otherwise.
 */
export function verifyToken(token: string): any | null {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}