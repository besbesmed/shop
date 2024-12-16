import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Important pour activer le mode sombre avec la classe 'dark'
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Ajoutez des couleurs spécifiques pour le mode sombre si nécessaire :
        dark: {
          background: "#121212", // Couleur de fond en mode sombre
          foreground: "#f5f5f5", // Couleur de texte en mode sombre
          // Vous pouvez ajouter d'autres couleurs spécifiques au mode sombre ici
        },
      },
    },
  },
  plugins: [],
} satisfies Config;