import { Profile, columns } from './structure';
import { DataTable } from '@/components/Table';
import { sampleData } from './sampleData';
import { useMemo } from 'react';
import { Separator } from '@/components/ui/separator';

// async function getData(): Promise<Profile[]> {
//   // Fetch data from your API here.x
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }

const ProfilesHr = () => {
  sampleData.sort((a, b) => {
    const lastNameA = a.fullName.split(' ').pop()?.toLowerCase() || ''; // Extract last name from fullName and convert to lowercase
    const lastNameB = b.fullName.split(' ').pop()?.toLowerCase() || ''; // Extract last name from fullName and convert to lowercase

    return lastNameA.localeCompare(lastNameB); // Compare last names
  });

  const data = sampleData;

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
      {/* <div className='flex w-full'> */}

      <div className="w-4/5 flex flex-col m-auto bg-white rounded-lg mb-20">
        <header className="text-2xl text-left m-5">
          Employee Profiles for HR to Review
        </header>
        <Separator />
        <DataTable columns={columns} data={data} filterValue="fullName" />
      </div>
    </div>
    // </div>
  );
};

export default ProfilesHr;
