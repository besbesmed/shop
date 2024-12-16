// components/common/Navbar.tsx
'use client'
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-800 dark:text-white">
          Level Up
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Products
            </Link>
          </li>
          {/* Ajoutez d'autres liens de navigation ici */}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;