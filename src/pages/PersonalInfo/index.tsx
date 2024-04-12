import { Separator } from '@/components/ui/separator';
import NameSection from './name';
import AddressSection from './address';
import ContactSection from './contact';
import EmergencySection from './emergency';
import EmploymentSection from './employment';
import { useAppSelector } from '@/app/hooks';
import { selectToken } from '@/features/auth/AuthSlice';
import { useLazyQuery } from '@apollo/client';
import { FETCH } from './gql';
import { handleApolloError } from '@/utils/error';
import { useEffect } from 'react';

const PersonalInfo = () => {
  const token = useAppSelector(selectToken);

  const [get, { loading, data }] = useLazyQuery(FETCH, {
    onCompleted: data => {
      console.log(data);
    },
    onError: handleApolloError(),
  });

  useEffect(() => {
    get({ variables: { token } });
  }, [get, token]);

  if (!data || loading) {
    return (
      <div className="flex flex-grow justify-center">
        <p className="text-2xl font-semibold m-auto">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-grow">
      <div className="flex flex-col w-4/5 mx-auto bg-white rounded-lg mb-2">
        <header className="text-3xl font-semibold mt-16 mb-5 mx-28">
          Profile
        </header>
        <Separator className="my-5 w-4/5 self-center" />
        <div className="flex flex-col mt-3 mb-16 mx-44">
          <NameSection
            initialValues={{
              avatar:
                data.employee.documents.filter(
                  (doc: any) => doc.type === 'avatar',
                )?.[0]?.file || 'https://github.com/shadcn.png',
              email: data.employee.email,
              firstName: data.employee.firstName,
              middleName: data.employee.middleName,
              lastName: data.employee.lastName,
              preferredName: data.employee.preferredName,
              ssn: data.employee.ssn,
              dateOfBirth: new Date(data.employee.dateOfBirth),
              gender: data.employee.gender,
            }}
            token={token}
          />
          <Separator className="my-2" />
          <AddressSection
            initialValues={{
              street: data.employee.streetAddress,
              apt: data.employee.apartment,
              city: data.employee.city,
              state: data.employee.state,
              zip: data.employee.zip,
            }}
            token={token}
          />
          <Separator className="my-2" />
          <ContactSection
            initialValues={{
              cellPhone: data.employee.cellPhone,
              workPhone: data.employee.workPhone || '',
            }}
            token={token}
          />
          <Separator className="my-2" />
          <EmploymentSection
            initialValues={{
              visa: ['h1b', 'l2', 'f1', 'h4'].includes(data.employee.visaType)
                ? data.employee.visaType
                : data.employee.visaType === ''
                  ? ''
                  : 'other',
              startDate: data.employee.visaStartDate
                ? new Date(data.employee.visaStartDate)
                : undefined,
              endDate: data.employee.visaEndDate
                ? new Date(data.employee.visaEndDate)
                : undefined,
            }}
            token={token}
            citizenship={data.employee.citizenship}
          />
          <Separator className="my-2" />
          <EmergencySection
            initialValues={{
              emergencyContact: data.employee.emergencyContacts.map(
                (contact: any) => ({
                  id: contact.id,
                  firstName: contact.firstName,
                  middleName: contact.middleName || '',
                  lastName: contact.lastName,
                  email: contact.email || '',
                  phone: contact.phone || '',
                  relationship: contact.relationship,
                }),
              ),
            }}
            token={token}
          />
          {data.employee.documents.length > 0 && (
            <>
              <Separator className="my-2 self-center" />
              <header className="text-2xl font-semibold my-5">
                Upload Documents
              </header>
              <ul className="flex flex-col w-full">
                {data.employee.documents.map((document: any, index: number) => (
                  <li
                    key={index}
                    className="flex my-2 justify-between items-center"
                  >
                    <p>{document.file}</p>
                    <a
                      className="text-blue-600 underline"
                      href={document.file}
                      target="_blank"
                      rel="noreferrer"
                    >
                      preview
                    </a>
                    <a
                      className="text-blue-600 underline"
                      href={document.file}
                      download={document.file}
                    >
                      download
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
