import type react from 'react';
import { useEffect } from 'react';
import { useAppSelector } from '@/app/hooks';
import {
  selectLoginStatus,
  selectOnboardingStatus,
} from '@/features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: react.ReactNode;
}

const ProtectedRoute: react.FC<ProtectedRouteProps> = props => {
  const loginStatus = useAppSelector(selectLoginStatus);
  const onboardingStatus = useAppSelector(selectOnboardingStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate('/login');
    } else {
      if (onboardingStatus !== 'approved') {
        navigate('/onboarding');
      }
    }
  }, [loginStatus, navigate, onboardingStatus]);

  return <>{props.element}</>;
};

export default ProtectedRoute;
