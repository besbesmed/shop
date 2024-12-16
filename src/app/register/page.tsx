// app/register/page.tsx
import RegisterForm from '../../components/auth/RegisterForm';
import Image from 'next/image';

const RegisterPage = () => {
  return (
    <>
      <a href="/">
        <Image src="/logo.png" alt="Level Up Logo" width={160} height={80} className="mb-8 mx-auto" />
      </a>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;