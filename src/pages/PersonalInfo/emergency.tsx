import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import Section from './section';
import { useFormik } from 'formik';
import { array, object, string } from 'yup';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@apollo/client';
import { UPDATE_EMERGENCY_SECTION } from './gql';
import { handleApolloError } from '@/utils/error';

interface EmergencyContact {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  relationship: string;
}

interface EmergencySectionProps {
  initialValues: {
    emergencyContact: EmergencyContact[];
  };
  token: string;
}

const validationSchema = object({
  emergencyContact: array()
    .of(
      object({
        firstName: string().required('First name is required'),
        lastName: string().required('Last name is required'),
        middleName: string(),
        email: string().email('Invalid email address'),
        phone: string().matches(/^\d{10}$/, 'Invalid phone number'),
        relationship: string().required('Relationship is required'),
      }),
    )
    .required('Emergency contact is required'),
});

const valuesToVariables = (values: any) => {
  return values.emergencyContact.map((contact: any) => ({
    firstName: contact.firstName,
    middleName: contact.middleName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    relationship: contact.relationship,
  }));
};

const EmergencySection = (props: EmergencySectionProps) => {
  const [editable, setEditable] = useState(false);

  const [update, { loading }] = useMutation(UPDATE_EMERGENCY_SECTION, {
    onCompleted: data => {
      console.log(data);
    },
    onError: handleApolloError(),
  });

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema,
    onSubmit: values => {
      update({
        variables: {
          token: props.token,
          data: { emergencyContacts: valuesToVariables(values) },
        },
      });
    },
  });

  return (
    <Section
      editable={editable}
      title="Emergency Contact"
      loading={loading}
      onCancel={() => {
        toast({
          description: 'discard changes?',
          action: (
            <ToastAction
              altText="Yes"
              onClick={() => {
                formik.setValues(props.initialValues);
                setEditable(false);
              }}
            >
              Yes
            </ToastAction>
          ),
        });
      }}
      onEdit={() => setEditable(!editable)}
      onSubmit={e => {
        e.preventDefault();
        formik.handleSubmit();
        setEditable(false);
      }}
    >
      {formik.values.emergencyContact.map((contact, index) => (
        <div key={contact.id}>
          <div className="flex my-5 justify-between w-full">
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">First Name</Label>
              <Input
                name={`emergencyContact[${index}].firstName`}
                value={contact.firstName}
                onChange={formik.handleChange}
                type="text"
                placeholder="Enter first name"
                disabled={!editable}
              />
              <p className="text-sm text-red-600">
                {formik.touched.emergencyContact &&
                  // @ts-ignore
                  formik.errors.emergencyContact?.[index]?.firstName}
              </p>
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">Middle Name</Label>
              <Input
                name={`emergencyContact[${index}].middleName`}
                value={contact.middleName}
                onChange={formik.handleChange}
                type="text"
                placeholder="Enter middle name"
                disabled={!editable}
              />
              <p className="text-sm text-red-600">
                {formik.touched.emergencyContact &&
                  // @ts-ignore
                  formik.errors.emergencyContact?.[index]?.middleName}
              </p>
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">Last Name</Label>
              <Input
                name={`emergencyContact[${index}].lastName`}
                value={contact.lastName}
                onChange={formik.handleChange}
                type="text"
                placeholder="Enter last name"
                disabled={!editable}
              />
              <p className="text-sm text-red-600">
                {formik.touched.emergencyContact &&
                  // @ts-ignore
                  formik.errors.emergencyContact?.[index]?.lastName}
              </p>
            </div>
          </div>
          <div className="flex my-5 justify-between w-full">
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">Email</Label>
              <Input
                name={`emergencyContact[${index}].email`}
                value={contact.email}
                onChange={formik.handleChange}
                type="text"
                placeholder="Enter email address"
                disabled={!editable}
              />
              <p className="text-sm text-red-600">
                {formik.touched.emergencyContact &&
                  // @ts-ignore
                  formik.errors.emergencyContact?.[index]?.email}
              </p>
            </div>
            <div className="flex flex-col w-1/3">
              <Label className="my-1 text-md font-semibold">Phone</Label>
              <Input
                name={`emergencyContact[${index}].phone`}
                value={contact.phone}
                onChange={formik.handleChange}
                type="text"
                placeholder="Enter phone number"
                disabled={!editable}
              />
              <p className="text-sm text-red-600">
                {formik.touched.emergencyContact &&
                  // @ts-ignore
                  formik.errors.emergencyContact?.[index]?.phone}
              </p>
            </div>
            <div className="flex flex-col w-1/4">
              <Label className="my-1 text-md font-semibold">relationship</Label>
              <Input
                name={`emergencyContact[${index}].relationship`}
                value={contact.relationship}
                onChange={formik.handleChange}
                type="text"
                placeholder="Indicate relationship"
                disabled={!editable}
              />
              <p className="text-sm text-red-600">
                {formik.touched.emergencyContact &&
                  // @ts-ignore
                  formik.errors.emergencyContact?.[index]?.relationship}
              </p>
            </div>
          </div>
          <Button
            disabled={!editable}
            variant="link"
            className="text-blue-600 self-start p-0"
            onClick={() => {
              const newEmergencyContact = formik.values.emergencyContact.filter(
                (_, i) => i !== index,
              );
              formik.setFieldValue('emergencyContact', newEmergencyContact);
            }}
          >
            -remove
          </Button>
        </div>
      ))}
      <Button
        disabled={!editable}
        variant="link"
        className="text-blue-600 self-start p-0"
        onClick={() => {
          const newEmergencyContact = [
            ...formik.values.emergencyContact,
            {
              id: Math.random().toString(),
              firstName: '',
              middleName: '',
              lastName: '',
              email: '',
              phone: '',
              relationship: '',
            },
          ];
          formik.setFieldValue('emergencyContact', newEmergencyContact);
        }}
      >
        +add new
      </Button>
    </Section>
  );
};

export default EmergencySection;
