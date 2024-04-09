import type react from 'react';
import { useEffect } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectLoginStatus } from '@/features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: react.ReactNode;
}

const ProtectedRoute: react.FC<ProtectedRouteProps> = props => {
  const loginStatus = useAppSelector(selectLoginStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate('/login');
    }
  }, [loginStatus, navigate]);

  return <>{props.element}</>;
};

export default ProtectedRoute;
