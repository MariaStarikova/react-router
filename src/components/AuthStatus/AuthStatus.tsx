import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import './AuthStatus.scss';

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('auth:', auth);
  }, [auth]);

  if (auth?.user === null) {
    return <p className="auth-status__text">Вы не вошли в систему.</p>;
  }

  if (auth !== null) {
    const handleSignout = () => {
      auth.signout(() => {
        navigate('/');
      });
    };

    return (
      <div className="auth-status">
        <p className="auth-status__text">Добро пожаловать, {auth.user?.email}</p>
        <button className="auth-status__button" onClick={handleSignout}>
          Выйти
        </button>
      </div>
    );
  }

  return <></>;
}
