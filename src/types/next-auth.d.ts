// // src/types/next-auth.d.ts
// import NextAuth, { DefaultSession } from 'next-auth';
// import { User as PrismaUser, Role } from '@prisma/client';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: number;
//       role: Role;
//     } & DefaultSession['user'];
//   }

//   interface User extends PrismaUser {}
// }