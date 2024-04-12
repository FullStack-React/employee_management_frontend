import React from 'react';
import { columns } from './structure';
import type { Employee } from './structure';
import { DataTable } from './Table';
import { employeeData } from './sampleData';
import { useMemo, useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { useLazyQuery, gql } from '@apollo/client';
import { ToastAction } from '@/components/ui/toast';
import { handleApolloError } from '@/utils/error';
import { useAppSelector } from '@/app/hooks';
import { selectToken } from '@/features/auth/AuthSlice';

const GET_USERS = gql`
  query AllUser {
    allUser {
      id
      fullName
      username
      email
      status
    }
  }
`;

const Onboarding = () => {
  // const data = employeeData;
  const [data, setData] = useState<Employee[]>([]);
  const token = useAppSelector(selectToken);
  const [getUsers] = useLazyQuery(GET_USERS, {
    onError: handleApolloError(
      <ToastAction altText="Try Again" onClick={() => window.location.reload()}>
        Error fetching Users. Try again.
      </ToastAction>,
    ),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const { data } = await getUsers({ variables: { token } });
        setData(data.allUser);
      }
    };
    fetchData();
  }, [token, getUsers]);

  const loading = useMemo(
    () => (data.length === 0 ? 'pending' : 'done'),
    [data],
  );

  if (loading === 'pending') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-black text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-auto">
      <div className="m-5">
        <header className="text-xl font-semibold text-left mx-5">
          Pending Applications
        </header>

        <div className="h-80 overflow-scroll md:mx-20 mx-2">
          <DataTable
            columns={columns}
            data={data}
            filterid="status"
            filtervalue="pending"
          />
        </div>
      </div>
      <Separator />
      <div className="m-5">
        <header className="text-xl font-semibold text-left mx-5">
          Approved Applications
        </header>

        <div className="h-80 overflow-scroll md:mx-20 mx-2">
          <DataTable
            columns={columns}
            data={data}
            filterid="status"
            filtervalue="approved"
          />
        </div>
      </div>
      <Separator />
      <div className="m-5">
        <header className="text-xl font-semibold text-left mx-5">
          Rejected Applications
        </header>

        <div className="h-80 overflow-scroll md:mx-20 mx-2">
          <DataTable
            columns={columns}
            data={data}
            filterid="status"
            filtervalue="rejected"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
