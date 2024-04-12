// @ts-nocheck
import { Separator } from '@/components/ui/separator';
import { useLazyQuery } from '@apollo/client';
import { QUERY_VISA } from './gql';
import { handleApolloError } from '@/utils/error';
import { useEffect, useState } from 'react';
import { FileInput } from './input';
import { useAppSelector } from '@/app/hooks';
import { selectToken } from '@/features/auth/AuthSlice';

const Visa = () => {
  const token = useAppSelector(selectToken);
  const [uri, setUri] = useState<string>('');
  const [data, setData] = useState(null);
  const [query, { loading }] = useLazyQuery(QUERY_VISA, {
    onCompleted: data => {
      console.log(data);
      setData(data);
    },
    onError: handleApolloError(),
  });

  useEffect(() => {
    query({ variables: { token } });
  }, [query, token]);

  if (!data || loading) {
    return (
      <div className="flex flex-grow justify-center">
        <p className="text-2xl font-semibold m-auto">Loading...</p>
      </div>
    );
  }

  let Element = null;
  if (data.visa.optReceipt.status === 'unsubmitted') {
    Element = (
      <>
        <header className="text-2xl font-semibold my-5">OPT Receipt</header>
        <FileInput
          title="OPT Receipt"
          setFile={_ => {}}
          setUri={setUri}
          setData={setData}
          token={token}
          fileType="optReceipt"
          uri={uri}
        />
      </>
    );
  } else if (data.visa.optReceipt.status === 'pending') {
    Element = (
      <header className="text-2xl font-semibold my-5">
        Waiting for HR to approve your OPT Receipt
      </header>
    );
  } else if (data.visa.optReceipt.status === 'rejected') {
    Element = (
      <>
        <header className="text-2xl font-semibold my-5">OPT Receipt</header>
        <FileInput
          title="OPT Receipt"
          setFile={_ => {}}
          setUri={setUri}
          setData={setData}
          token={token}
          fileType="optReceipt"
          uri={uri}
        />
        <p className="text-red-500 text-sm font-semibold">
          {data.visa.optReceipt.feedback}
        </p>
      </>
    );
  } else if (
    data.visa.optReceipt.status === 'approved' &&
    data.visa.optEad.status === 'unsubmitted'
  ) {
    Element = (
      <>
        <header className="text-2xl font-semibold my-5">OPT EAD</header>
        <FileInput
          title="OPT EAD"
          setFile={_ => {}}
          setUri={setUri}
          setData={setData}
          token={token}
          fileType="optEad"
          uri={uri}
        />
      </>
    );
  } else if (
    data.visa.optReceipt.status === 'approved' &&
    data.visa.optEad.status === 'pending'
  ) {
    Element = (
      <header className="text-2xl font-semibold my-5">
        Waiting for HR to approve your OPT EAD
      </header>
    );
  } else if (
    data.visa.optReceipt.status === 'approved' &&
    data.visa.optEad.status === 'rejected'
  ) {
    Element = (
      <>
        <header className="text-2xl font-semibold my-5">OPT EAD</header>
        <FileInput
          title="OPT EAD"
          setFile={_ => {}}
          setUri={setUri}
          setData={setData}
          token={token}
          fileType="optEad"
          uri={uri}
        />
        <p className="text-red-500 text-sm font-semibold">
          {data.visa.optEad.feedback}
        </p>
      </>
    );
  } else if (
    data.vsia.optReceipt.status === 'approved' &&
    data.visa.optEad.status === 'approved' &&
    data.visa.i983.status === 'unsubmitted'
  ) {
    Element = (
      <>
        <header className="text-2xl font-semibold my-5">I983</header>
        <FileInput
          title="I983"
          setFile={_ => {}}
          setUri={setUri}
          setData={setData}
          token={token}
          fileType="i983"
          uri={uri}
        />
      </>
    );
  } else if (
    data.visa.optReceipt.status === 'approved' &&
    data.visa.optEad.status === 'approved' &&
    data.visa.i983.status === 'pending'
  ) {
    Element = (
      <header className="text-2xl font-semibold my-5">
        Waiting for HR to approve your I983
      </header>
    );
  } else if (
    data.visa.optReceipt.status === 'approved' &&
    data.visa.optEad.status === 'approved' &&
    data.visa.i983.status === 'rejected'
  ) {
    Element = (
      <>
        <header className="text-2xl font-semibold my-5">I983</header>
        <FileInput
          title="I983"
          setFile={_ => {}}
          setUri={setUri}
          setData={setData}
          token={token}
          fileType="i983"
          uri={uri}
        />
        <p className="text-red-500 text-sm font-semibold">
          {data.visa.i983.feedback}
        </p>
      </>
    );
  } else if (
    data.visa.optReceipt.status === 'approved' &&
    data.visa.optEad.status === 'approved' &&
    data.visa.i983.status === 'approved' &&
    data.visa.i20.status === 'unsubmitted'
  ) {
    Element = (
      <>
        <header className="text-2xl font-semibold my-5">I20</header>
        <FileInput
          title="I20"
          setFile={_ => {}}
          setUri={setUri}
          setData={setData}
          token={token}
          fileType="i20"
          uri={uri}
        />
      </>
    );
  } else if (
    data.visa.optReceipt.status === 'approved' &&
    data.visa.optEad.status === 'approved' &&
    data.visa.i983.status === 'approved' &&
    data.visa.i20.status === 'pending'
  ) {
    Element = (
      <header className="text-2xl font-semibold my-5">
        Waiting for HR to approve your I20
      </header>
    );
  } else if (
    data.visa.optReceipt.status === 'approved' &&
    data.visa.optEad.status === 'approved' &&
    data.visa.i983.status === 'approved' &&
    data.visa.i20.status === 'rejected'
  ) {
    Element = (
      <>
        <header className="text-2xl font-semibold my-5">I20</header>
        <FileInput
          title="I20"
          setFile={_ => {}}
          setUri={setUri}
          setData={setData}
          token={token}
          fileType="i20"
          uri={uri}
        />
        <p className="text-red-500 text-sm font-semibold">
          {data.visa.i20.feedback}
        </p>
      </>
    );
  } else if (
    data.visa.optReceipt.status === 'approved' &&
    data.visa.optEad.status === 'approved' &&
    data.visa.i983.status === 'approved' &&
    data.visa.i20.status === 'approved'
  ) {
    Element = (
      <header className="text-2xl font-semibold my-5">
        All your visa documents have been approved
      </header>
    );
  }

  return (
    <div className="flex flex-grow">
      <div className="flex flex-col w-4/5 mx-auto bg-white rounded-lg mb-2">
        <header className="text-3xl font-semibold mt-16 mb-5 mx-28">
          Visa Management
        </header>
        <Separator className="my-5 w-4/5 self-center" />
        <div className="flex flex-col mt-3 mb-16 mx-44">{Element}</div>
      </div>
    </div>
  );
};

export default Visa;
