import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isOnline = navigator.onLine;
  const auth = useAuth();

  if (!isOnline) {
    return <Navigate to="/offline" replace />;
  }

  if (auth?.user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}
