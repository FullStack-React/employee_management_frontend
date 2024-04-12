import type { Profile } from './structure';
import { columns } from './structure';
import { DataTable } from '@/pages/ProfilesHr/Table';
import { useEffect, useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { useLazyQuery, gql } from '@apollo/client';
import { ToastAction } from '@/components/ui/toast';
import { handleApolloError } from '@/utils/error';
import { useAppSelector } from '@/app/hooks';
import { selectToken } from '@/features/auth/AuthSlice';
import { useState } from 'react';

const GET_PROFILES = gql`
  query GetAllEmployeesProfiles {
    getAllEmployeesProfiles {
      user
      firstName
      lastName
      middleName
      visaType
      ssn
      workPhone
      cellPhone
      email
    }
  }
`;

const ProfilesHr = () => {
  const token = useAppSelector(selectToken);
  const [getProfiles] = useLazyQuery(GET_PROFILES, {
    onError: handleApolloError(
      <ToastAction altText="Try Again" onClick={() => window.location.reload()}>
        Error fetching employee profiles. Try again.
      </ToastAction>,
    ),
  });

  const [data, setData] = useState<Profile[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const { data } = await getProfiles({ variables: { token } });

        const sortedData = [...data.getAllEmployeesProfiles].sort(
          (a: Profile, b: Profile) => {
            return a.lastName.localeCompare(b.lastName);
          },
        );

        setData(sortedData);
      }
    };
    fetchData();
  }, [token, getProfiles]);

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
    <div className="flex flex-col flex-grow bg-slate-200">
      <div className="md:w-4/5 w-full flex flex-col mx-auto bg-white rounded-lg mb-20">
        <header className="md:text-3xl text-xl font-semibold text-left m-5 mx-28">
          Employee Profiles for HR to Review
        </header>
        <Separator />
        <div className="md:px-20 p-0">
          <DataTable columns={columns} data={data} filterValue="fullName" />
        </div>
      </div>
    </div>
  );
};

export default ProfilesHr;
