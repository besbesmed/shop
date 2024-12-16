// app/login/page.tsx
import LoginForm from '../../components/auth/LoginForm';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <>
      <a href="/">
        <Image
          src="/logo.png"
          alt="Level Up Logo"
          width={160}
          height={80}
          className="mb-8 mx-auto"
        />
      </a>
      <LoginForm />
    </>
  );
};

export default LoginPage;