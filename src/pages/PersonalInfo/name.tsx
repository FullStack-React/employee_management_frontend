import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { DatePicker } from '@/components/ui/datepicker';
import { Combobox } from '@/components/ui/combobox';
import { genders } from '../Onborading/options';
import Section from './section';
import { useFormik } from 'formik';
import { handleFileChange } from '@/utils/file';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { date, object, string } from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_NAME_SECTION } from './gql';
import { handleApolloError } from '@/utils/error';

interface NameSectionInitialValues {
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  ssn: string;
  dateOfBirth: Date | undefined;
  gender: string;
}

interface NameSectionProps {
  initialValues: NameSectionInitialValues;
  token: string;
}

const validationSchema = object({
  avatar: string().required('Avatar is required'),
  email: string().email().required('Email is required'),
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  middleName: string(),
  preferredName: string(),
  ssn: string()
    .matches(/^[0-9]{9}$/, 'SSN must be 9 digits')
    .required('SSN is required'),
  dateOfBirth: date().required('Date of birth is required'),
  gender: string().required('gender is required'),
});

const valuesToVariables = (values: NameSectionInitialValues) => {
  return {
    avatar: values.avatar,
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName,
    preferredName: values.preferredName,
    ssn: values.ssn,
    dateOfBirth: values.dateOfBirth?.getTime(),
    gender: values.gender,
  };
};

const NameSection = (props: NameSectionProps) => {
  const [editable, setEditable] = useState(false);

  const [genderOpen, setGenderOpen] = useState(false);

  const [avatarImage, setAvatarImage] = useState<File | null>(null);

  const [update, { loading }] = useMutation(UPDATE_NAME_SECTION, {
    onCompleted: data => {},
    onError: handleApolloError(),
  });

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema,
    onSubmit: values => {
      update({
        variables: {
          token: props.token,
          data: valuesToVariables(values),
        },
      });
    },
  });

  return (
    <Section
      editable={editable}
      title="Name"
      loading={loading}
      onEdit={() => setEditable(true)}
      onCancel={() => {
        toast({
          description: 'Discard changes?',
          action: (
            <ToastAction
              onClick={() => {
                formik.setValues(props.initialValues);
                setEditable(false);
              }}
              altText="Yes"
            >
              Yes
            </ToastAction>
          ),
        });
      }}
      onSubmit={() => {
        formik.handleSubmit();
        setEditable(false);
      }}
    >
      <div className="flex my-5 items-center justify-between w-full">
        <div className="flex w-1/5">
          <Input
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
            disabled={!editable}
            onChange={handleFileChange(
              200000,
              setAvatarImage,
              formik.setFieldValue,
              'avatar',
              props.token,
            )}
          />
          <Label
            htmlFor="avatar"
            className={`${editable ? 'cursor-pointer' : 'cursor-not-allowed'} w-full h-full`}
          >
            <Avatar className="rounded-full w-full h-full">
              <AvatarImage src={formik.values.avatar} alt="avatar" />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
          </Label>
          <p className="text-red-600 text-sm">
            {formik.touched.avatar && formik.errors.avatar}
          </p>
        </div>
        <div className="flex flex-col w-3/5">
          <div className="flex flex-col my-1 items-center justify-between w-full">
            <div className="flex flex-col w-full">
              <Label className="my-1 text-md font-semibold">Email</Label>
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                disabled={!editable}
                type="text"
                placeholder="Enter your email"
              />
              <p className="text-red-600 text-sm">
                {formik.touched.email && formik.errors.email}
              </p>
            </div>
          </div>
          <div className="flex my-1 items-center justify-between w-full">
            <div className="flex flex-col w-2/5">
              <Label className="my-1 text-md font-semibold">First Name</Label>
              <Input
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                disabled={!editable}
                type="text"
                placeholder="Enter your first name"
              />
              <p className="text-red-600 text-sm">
                {formik.touched.firstName && formik.errors.firstName}
              </p>
            </div>
            <div className="flex flex-col w-2/5">
              <Label className="my-1 text-md font-semibold">Last Name</Label>
              <Input
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                disabled={!editable}
                type="text"
                placeholder="Enter your last name"
              />
              <p className="text-red-600 text-sm">
                {formik.touched.lastName && formik.errors.lastName}
              </p>
            </div>
          </div>
          <div className="flex my-1 items-center justify-between w-full">
            <div className="flex flex-col w-2/5">
              <Label className="my-1 text-md font-semibold">Middle Name</Label>
              <Input
                name="middleName"
                value={formik.values.middleName}
                onChange={formik.handleChange}
                disabled={!editable}
                type="text"
                placeholder="Enter your last name"
              />
              <p className="text-red-600 text-sm">
                {formik.touched.middleName && formik.errors.middleName}
              </p>
            </div>
            <div className="flex flex-col w-2/5">
              <Label className="my-1 text-md font-semibold">
                Preferred Name
              </Label>
              <Input
                name="preferredName"
                value={formik.values.preferredName}
                onChange={formik.handleChange}
                disabled={!editable}
                type="text"
                placeholder="Enter your prefered name"
              />
              <p className="text-red-600 text-sm">
                {formik.touched.preferredName && formik.errors.preferredName}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-5 justify-between w-full">
        <div className="flex flex-col w-1/3">
          <Label className="my-1 text-md font-semibold">SSN</Label>
          <Input
            name="ssn"
            value={formik.values.ssn}
            onChange={formik.handleChange}
            type="text"
            placeholder="Enter your ssn"
            disabled={!editable}
          />
          <p className="text-red-600 text-sm">
            {formik.touched.ssn && formik.errors.ssn}
          </p>
        </div>
        <div className="flex flex-col w-1/4">
          <Label className="my-1 text-md font-semibold">Date of Birth</Label>
          <DatePicker
            disabled={!editable}
            value={formik.values.dateOfBirth}
            onSelect={(value: Date | undefined) => {
              formik.setFieldValue('dateOfBirth', value);
            }}
          />
          <p className="text-red-600 text-sm">
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          </p>
        </div>
        <div className="flex flex-col w-1/5">
          <Label className="my-1 text-md font-semibold">Gender</Label>
          <Combobox
            open={genderOpen}
            value={formik.values.gender}
            buttonText="Gender"
            options={genders}
            disabled={!editable}
            onOpenChange={setGenderOpen}
            onSelect={currentValue => {
              formik.setFieldValue(
                'gender',
                currentValue === formik.values.gender ? '' : currentValue,
              );
              setGenderOpen(false);
            }}
          />
          <p className="text-red-600 text-sm">
            {formik.touched.gender && formik.errors.gender}
          </p>
        </div>
      </div>
    </Section>
  );
};

export default NameSection;
