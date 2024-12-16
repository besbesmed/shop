// src/components/auth/LoginForm.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Gestion du "Remember me"
        if (rememberMe) {
          // Cookie persistant (30 jours)
          setCookie('auth', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 jours
            sameSite: 'strict',
            path: '/',
          });
        } else {
          // Cookie de session (expire à la fermeture du navigateur)
          setCookie('auth', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 jour
            sameSite: 'strict',
            path: '/',
          });
        }
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-8 rounded-3xl bg-white shadow max-w-sm mx-auto">
      <h2 className="text-gray-800 text-center text-2xl font-bold">Sign In</h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="text-gray-800 text-sm mb-2 block">
            Email or Username
          </label>
          <div className="relative flex items-center">
            <input
              name="identifier"
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Enter email or username"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-4 h-4 absolute right-4"
              viewBox="0 0 24 24"
            >
              <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
              <path
                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                data-original="#000000"
              ></path>
            </svg>
          </div>
        </div>

        <div>
          <label className="text-gray-800 text-sm mb-2 block">Password</label>
          <div className="relative flex items-center">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Enter password"
            />
            <svg
              onClick={togglePasswordVisibility}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute right-4 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="text-blue-600 hover:underline font-semibold">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="!mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
        <p className="text-gray-800 text-sm !mt-8 text-center">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;