// src/components/auth/RegisterForm.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [nom, setNom] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tlf, setTlf] = useState('');
  const [adresse, setAdresse] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return 'Le mot de passe doit contenir au moins 6 caractères.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une lettre minuscule.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une lettre majuscule.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Le mot de passe doit contenir au moins un chiffre.';
    }
    return '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setIsLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    // Création d'un objet avec les données du formulaire
    const formData = {
      nom,
      username,
      email,
      password,
      tlf,
      adresse,
      dateNaissance,
    };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Important pour envoyer du JSON
        },
        body: JSON.stringify(formData), // Conversion en JSON
      });

      if (response.ok) {
        const data = await response.json();
        setCookie('auth', data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24,
          sameSite: 'strict',
          path: '/',
        });
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error(error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-white shadow max-w-xl mx-auto">
      <h2 className="text-gray-800 text-center text-2xl font-bold">
        Register
      </h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Nom</label>
            <input
              name="nom"
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Entrez votre nom"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Choisissez un nom d'utilisateur"
            />
          </div>
        </div>
        <div>
          <label className="text-gray-800 text-sm mb-2 block">Email</label>
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            placeholder="Entrez votre email"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Mot de passe
            </label>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Choisissez un mot de passe"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Confirmez le mot de passe
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Confirmez votre mot de passe"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              Téléphone
            </label>
            <input
              name="tlf"
              type="tel"
              value={tlf}
              onChange={(e) => setTlf(e.target.value)}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Entrez votre numéro de téléphone"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Adresse</label>
            <input
              name="adresse"
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Entrez votre adresse"
            />
          </div>
        </div>
        <div>
          <label className="text-gray-800 text-sm mb-2 block">
            Date de naissance
          </label>
          <input
            name="dateNaissance"
            type="date"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
          />
        </div>
        <div className="!mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </div>
        <p className="text-gray-800 text-sm !mt-8 text-center">
          Vous avez déjà un compte ?{' '}
          <a
            href="/login"
            className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
          >
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;