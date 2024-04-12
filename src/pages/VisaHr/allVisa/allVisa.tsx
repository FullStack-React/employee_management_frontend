import type { Employee } from './structure';
import { columns } from './structure';
import { DataTable } from './Table';
import { useMemo } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { ToastAction } from '@/components/ui/toast';
import { handleApolloError } from '@/utils/error';
import { useAppSelector } from '@/app/hooks';
import { selectToken } from '@/features/auth/AuthSlice';
import { useState, useEffect } from 'react';

const GET_VISAS = gql`
  query AllVisa {
    allVisa {
      id
      fullName
      preferredName
      visaTitle
      visaStartDate
      visaEndDate
      optReceipt {
        feedback
        url
        status
      }
      optEad {
        feedback
        url
        status
      }
      i983 {
        feedback
        url
        status
      }
      i20 {
        feedback
        url
        status
      }
    }
  }
`;

const AllVisa = () => {
  const token = useAppSelector(selectToken);
  const [getVisas] = useLazyQuery(GET_VISAS, {
    onError: handleApolloError(
      <ToastAction altText="Try Again" onClick={() => window.location.reload()}>
        Error fetching visas. Try again.
      </ToastAction>,
    ),
  });

  const [data, setData] = useState<Employee[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const { data } = await getVisas({ variables: { token } });
        setData(data.allVisa);
      }
    };
    fetchData();
  }, [token, getVisas]);

  const loading = useMemo(
    () => (data.length === 0 ? 'pending' : 'done'),
    [data],
  );

  if (loading === 'pending') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-black md:text-2xl text-base font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AllVisa;
