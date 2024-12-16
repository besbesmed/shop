// lib/theme.ts
'use server' 

import { cookies } from 'next/headers';

export async function setTheme(theme: string) {
  const cookieStore = await cookies();
  (cookieStore as any).set('theme', theme);
}

export async function getTheme() {
  const cookieStore = await cookies();
  return cookieStore.get('theme')?.value;
}