import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('auth:', auth);
  }, [auth]);

  if (auth?.user === null) {
    return <p>Вы не вошли в систему.</p>;
  }

  if (auth !== null) {
    const handleSignout = () => {
      auth.signout(() => {
        navigate('/');
      });
    };

    return (
      <>
        <p>Добро пожаловать, {auth.user?.email}</p>
        <button onClick={handleSignout}>Выйти</button>
      </>
    );
  }

  return <></>;
}
