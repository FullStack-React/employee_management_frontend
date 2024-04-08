import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const [identity, setIdentity] = React.useState<string>('HR');

  const navigate = useNavigate();

  console.log(navigate);

  const goBackHandler = () => {
    if (identity === 'HR') {
      navigate('/profiles_hr');
    } else {
      navigate('/onboarding');
    }
  };

  const message =
    'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
  return (
    <div className="flex flex-grow bg-slate-200">
      <div className="flex flex-col m-auto gap-8">
        <div className="text-4xl text-center text-gray-800">
          {' '}
          404 - Not Found
        </div>

        <div className="text-center text-gray-800">{message}</div>
        <div className="text-center">
          <Button variant="default" size="lg" onClick={goBackHandler}>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
