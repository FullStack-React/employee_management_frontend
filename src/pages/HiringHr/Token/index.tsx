import type { History } from './structure';
import { columns } from './structure';
import { DataTable } from './Table';
import { tokenData } from './sampleData';
import { useEffect, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { ToastAction } from '@/components/ui/toast';
import { handleApolloError } from '@/utils/error';
import { useAppSelector } from '@/app/hooks';
import { selectToken } from '@/features/auth/AuthSlice';
import { toast } from '@/components/ui/use-toast';

const CREATE_TOKEN = gql`
  mutation CreateToken($email: String!) {
    createToken(email: $email) {
      email
      token
    }
  }
`;

const GET_TOKEN_HISTORY = gql`
  query GetAllTokenHistory {
    getAllTokenHistory {
      email
      URL
      status
      username
      fullName
    }
  }
`;

const Token = () => {
  const data = tokenData;
  const [tokenHistory, setTokenHistory] = useState<History[]>([]);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const token = useAppSelector(selectToken);

  // Define the useMutation hook to execute the mutation
  const [createToken, { loading: tokenSendLoading, error: emailAddressError }] =
    useMutation(CREATE_TOKEN, {
      onCompleted: () => {
        toast({
          title: 'Link',
          description: 'Registration Link Sent Successfully',
          duration: 5000,
        });
      },
      onError: handleApolloError(
        <ToastAction
          altText="Try Again"
          onClick={() => window.location.reload()}
        >
          Check Email Address and Try Again
        </ToastAction>,
      ),
    });

  const handleSend = async () => {
    let found = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (found) {
      setValidEmail(true);
      // Call the mutation function with the email variable
      const { data } = await createToken({ variables: { token, email } });
    } else {
      setEmail('');
      setValidEmail(false);
    }
  };

  const [getTokenHistory] = useLazyQuery(GET_TOKEN_HISTORY, {
    onError: handleApolloError(
      <ToastAction altText="Try Again" onClick={() => window.location.reload()}>
        Error fetching token history. Try again.
      </ToastAction>,
    ),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const { data } = await getTokenHistory({ variables: { token } });
        setTokenHistory(data.getAllTokenHistory);
        console.log(data);
      }
    };
    fetchData();
  }, [token, getTokenHistory]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onloading = useMemo(
    () => (data.length === 0 ? 'pending' : 'done'),
    [data],
  );

  if (onloading === 'pending') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-black text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div>
        <header className="md:text-2xl text-base font-semibold text-left mx-5 mt-5">
          Registration Token
        </header>

        <div className="text-gray-400 mx-5">
          Generate token and send it to the candidate for registration
        </div>

        <div className="ml-20 my-5">
          <div className="flex gap-5">
            <Input
              type="email"
              placeholder="Email for new employee"
              className="w-80"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={tokenSendLoading}
            />

            <Button onClick={handleSend}>Send</Button>
          </div>

          <div className="text-red-500 text-sm">
            {/* Display error message if emailAddressError exists */}
            {emailAddressError && 'Error creating token. Please try again.'}
            {!validEmail && 'Please enter a valid email'}
          </div>
        </div>
      </div>

      <Separator />

      <div className="mt-5">
        <div>
          <header className="md:text-2xl text-base font-semibold text-left m-5">
            Token History
          </header>
        </div>

        <DataTable columns={columns} data={tokenHistory} />
      </div>
    </div>
  );
};

export default Token;
