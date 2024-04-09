import type react from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/ui/combobox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState, useMemo, useEffect } from 'react';
import { DatePicker } from '@/components/ui/datepicker';
import { Separator } from '@/components/ui/separator';
import { genders, states, citizenOp, identities, visaTypes } from './options';
import { useAppSelector } from '@/app/hooks';
import { selectOnboardingStatus, selectToken } from '@/features/auth/AuthSlice';
import { useFormik } from 'formik';
import { initialValues } from './values';
import { handleFileChange, valuesToVariables } from './utils';
import { validationSchema } from './validate';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FETCH, ONBOARDING } from './gql';
import { handleApolloError } from '@/utils/error';
import { Loader2 } from 'lucide-react';

const Onboarding: react.FC = () => {
  // const token = useAppSelector(selectToken);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTczYTUzZWQ1ODY2NmQ4NWMzNWZiNSIsImlhdCI6MTcxMjc5ODQ5MiwiZXhwIjoxNzEzNjYyNDkyfQ.wIkbcRMSveWPI2ksNmMwjum_cLPfoxviU939yH-aPUE';
  const onboardingStatus = useAppSelector(selectOnboardingStatus);

  const { values, handleChange, setFieldValue, touched, errors, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema,
      onSubmit: (values: typeof initialValues) => {
        onboarding({ variables: { data: valuesToVariables(values), token } });
      },
    });

  const navigate = useNavigate();
  const [fetchOnboarding, { loading: fetchLoading }] = useLazyQuery(FETCH, {
    onCompleted: data => {
      data.employee.documents.forEach((document: any) => {
        if (document.type === 'avatar') {
          setFieldValue('avatar', document.file);
        }
        if (document.type === 'receipt') {
          setFieldValue('receipt', document.file);
        }
      });
      setFieldValue('firstName', data.employee.firstName);
      setFieldValue('lastName', data.employee.lastName);
      setFieldValue('middleName', data.employee.middleName);
      setFieldValue('preferredName', data.employee.preferredName);
      setFieldValue('street', data.employee.streetAddress);
      setFieldValue('apt', data.employee.apartment);
      setFieldValue('city', data.employee.city);
      setFieldValue('state', data.employee.state);
      setFieldValue('zip', data.employee.zip);
      setFieldValue('email', data.employee.email);
      setFieldValue('phone', data.employee.cellPhone);
      setFieldValue('ssn', data.employee.ssn);
      setFieldValue('dateOfBirth', new Date(data.employee.dateOfBirth));
      setFieldValue('gender', data.employee.gender);
      setFieldValue(
        'citizen',
        data.employee.citizenship === 'visa' ? 'no' : 'yes',
      );
      setFieldValue('identity', data.employee.citizenship);
      setFieldValue('visa', data.employee.visa);
      setFieldValue('startDate', new Date(data.employee.visaStartDate));
      setFieldValue('endDate', new Date(data.employee.visaEndDate));
      setFieldValue('visaType', data.employee.visaType);
      if (data.employee.referralFirstName) {
        setFieldValue('reference', true);
        setFieldValue('referenceFirstName', data.employee.referralFirstName);
        setFieldValue('referenceMiddleName', data.employee.referralMiddleName);
        setFieldValue('referenceLastName', data.employee.referralLastName);
        setFieldValue('referenceEmail', data.employee.referralEmail);
        setFieldValue('referencePhone', data.employee.referralPhone);
        setFieldValue(
          'referenceRelationship',
          data.employee.referralRelationship,
        );
      }
      setFieldValue('emergencyContact', data.employee.emergencyContacts);
    },
    onError: handleApolloError(),
  });
  const [onboarding, { loading: submitLoading }] = useMutation(ONBOARDING, {
    onCompleted: data => {
      console.log(data);
    },
    onError: handleApolloError(),
  });

  const editable = useMemo(
    () => onboardingStatus !== 'pending',
    [onboardingStatus],
  );

  useEffect(() => {
    if (onboardingStatus === 'approved') {
      navigate('/personal_info');
    } else if (
      onboardingStatus === 'rejected' ||
      onboardingStatus === 'pending'
    ) {
      fetchOnboarding({ variables: { token } });
      if (onboardingStatus === 'rejected') {
        // TODO: fetch feedback
      }
    }
  }, [onboardingStatus, navigate, fetchOnboarding]);

  const [stateOpen, setStateOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [citizenOpen, setCitizenOpen] = useState(false);
  const [identityOpen, setIdentityOpen] = useState(false);
  const [visaOpen, setVisaOpen] = useState(false);

  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  if (fetchLoading) {
    return (
      <div className="flex flex-grow justify-center">
        <p className="text-2xl font-semibold m-auto">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-grow">
      <form className="flex-grow" onSubmit={handleSubmit}>
        <fieldset
          className="flex flex-col w-4/5 mx-auto bg-white rounded-lg mb-2"
          disabled={!editable}
        >
          <header className="text-3xl font-semibold mt-16 mb-5 mx-28">
            Onboarding Application
          </header>
          <Separator className="my-5 w-4/5 self-center" />
          <div className="flex flex-col my-5 mx-44">
            <header className="text-2xl font-semibold my-5">
              Personal Information
            </header>
            <div className="flex my-5 items-center justify-between w-full">
              <div className="flex flex-col w-1/4 items-center mr-10">
                <Input
                  onChange={handleFileChange(
                    200000,
                    setAvatarImage,
                    setFieldValue,
                    'avatar',
                    token,
                  )}
                  name="avatar"
                  type="file"
                  id="avatar"
                  accept="image/*"
                  className="hidden"
                />
                <Label htmlFor="avatar" className="cursor-pointer w-3/4">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={values.avatar} alt="avatar" />
                    <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                </Label>
                <p className="text-sm text-red-500">
                  {touched.avatar && errors.avatar}
                </p>
              </div>
              <div className="flex-grow flex flex-col w-full">
                <div className="flex justify-between mb-1">
                  <div className="flex flex-col w-2/5">
                    <Label className="my-1 text-md font-semibold">
                      First Name*
                    </Label>
                    <Input
                      value={values.firstName}
                      name="firstName"
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your first name"
                    />
                    <p className="text-sm text-red-500">
                      {touched.firstName && errors.firstName}
                    </p>
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Label className="my-1 text-md font-semibold">
                      Last Name*
                    </Label>
                    <Input
                      value={values.lastName}
                      name="lastName"
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your last name"
                    />
                    <p className="text-sm text-red-500">
                      {touched.lastName && errors.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col w-2/5">
                    <Label className="my-1 text-md font-semibold">
                      Middle Name
                    </Label>
                    <Input
                      value={values.middleName}
                      name="middleName"
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your middle name"
                    />
                    <p className="text-sm text-red-500">
                      {touched.middleName && errors.middleName}
                    </p>
                  </div>
                  <div className="flex flex-col w-2/5">
                    <Label className="my-1 text-md font-semibold">
                      Preferred Name
                    </Label>
                    <Input
                      value={values.preferredName}
                      name="preferredName"
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your preferred name"
                    />
                    <p className="text-sm text-red-500">
                      {touched.preferredName && errors.preferredName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex my-5 justify-between w-full">
              <div className="flex flex-col w-1/2">
                <Label className="my-1 text-md font-semibold">Street*</Label>
                <Input
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  type="text"
                  placeholder="Street Line"
                />
                <p className="text-sm text-red-500">
                  {touched.street && errors.street}
                </p>
              </div>
              <div className="flex flex-col w-1/3">
                <Label className="my-1 text-md font-semibold">APT</Label>
                <Input
                  name="apt"
                  value={values.apt}
                  onChange={handleChange}
                  type="text"
                  placeholder="APT#"
                />
              </div>
            </div>
            <div className="flex my-5 justify-between w-full">
              <div className="flex flex-col w-1/4">
                <Label className="my-1 text-md font-semibold">City*</Label>
                <Input
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                />
                <p className="text-sm text-red-500">
                  {touched.city && errors.city}
                </p>
              </div>
              <div className="flex flex-col w-1/5">
                <Label className="my-1 text-md font-semibold">State*</Label>
                <Combobox
                  open={stateOpen}
                  value={values.state}
                  buttonText="State"
                  options={states}
                  placeholder="Select a State..."
                  onOpenChange={setStateOpen}
                  onSelect={currentValue => {
                    setFieldValue(
                      'state',
                      currentValue === values.state ? '' : currentValue,
                    );
                    setStateOpen(false);
                  }}
                />
                <p className="text-sm text-red-500">
                  {touched.state && errors.state}
                </p>
              </div>
              <div className="flex flex-col w-1/4">
                <Label className="my-1 text-md font-semibold">Zip Code*</Label>
                <Input
                  name="zip"
                  value={values.zip}
                  onChange={handleChange}
                  type="text"
                  placeholder="Zip Code"
                />
                <p className="text-sm text-red-500">
                  {touched.zip && errors.zip}
                </p>
              </div>
            </div>
            <div className="flex my-5 justify-between w-full">
              <div className="flex flex-col w-1/2">
                <Label className="my-1 text-md font-semibold">Email*</Label>
                <Input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your email address"
                />
                <p className="text-sm text-red-500">
                  {touched.email && errors.email}
                </p>
              </div>
              <div className="flex flex-col w-1/3">
                <Label className="my-1 text-md font-semibold">
                  Cell Phone*
                </Label>
                <Input
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your phone number"
                />
                <p className="text-sm text-red-500">
                  {touched.phone && errors.phone}
                </p>
              </div>
            </div>
            <div className="flex my-5 justify-between w-full">
              <div className="flex flex-col w-1/3">
                <Label className="my-1 text-md font-semibold">SSN*</Label>
                <Input
                  name="ssn"
                  value={values.ssn}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your ssn"
                />
                <p className="text-sm text-red-500">
                  {touched.ssn && errors.ssn}
                </p>
              </div>
              <div className="flex flex-col w-1/4">
                <Label className="my-1 text-md font-semibold">
                  Date of Birth*
                </Label>
                <DatePicker
                  value={values.dateOfBirth}
                  onSelect={(value: Date | undefined) => {
                    setFieldValue('dateOfBirth', value);
                  }}
                />
                <p className="text-sm text-red-500">
                  {touched.dateOfBirth && errors.dateOfBirth}
                </p>
              </div>
              <div className="flex flex-col w-1/5">
                <Label className="my-1 text-md font-semibold">Gender*</Label>
                <Combobox
                  open={genderOpen}
                  value={values.gender}
                  buttonText="Gender"
                  options={genders}
                  onOpenChange={setGenderOpen}
                  onSelect={currentValue => {
                    setFieldValue(
                      'gender',
                      currentValue === values.gender ? '' : currentValue,
                    );
                    setGenderOpen(false);
                  }}
                />
                <p className="text-sm text-red-500">
                  {touched.gender && errors.gender}
                </p>
              </div>
            </div>
            <div className="flex my-5 justify-start w-full">
              <div className="flex flex-col w-2/5">
                <Combobox
                  open={citizenOpen}
                  value={values.citizen}
                  buttonText="Permanent resident or citizen of the U.S.?"
                  options={citizenOp}
                  onOpenChange={setCitizenOpen}
                  onSelect={currentValue => {
                    const value =
                      currentValue === values.citizen ? '' : currentValue;
                    if (value !== 'yes') {
                      setFieldValue('identity', '');
                    }
                    if (value !== 'no') {
                      setFieldValue('visa', '');
                      setFieldValue('startDate', undefined);
                      setFieldValue('endDate', undefined);
                      setFieldValue('visaType', '');
                      setFieldValue('receipt', '');
                      setReceiptFile(null);
                    }
                    setFieldValue('citizen', value);
                    setCitizenOpen(false);
                  }}
                />
                <p className="text-sm text-red-500">
                  {touched.citizen && errors.citizen}
                </p>
              </div>
              {values.citizen === 'yes' && (
                <div className="ml-10 flex flex-col w-1/3">
                  <Combobox
                    open={identityOpen}
                    value={values.identity}
                    buttonText="Citizen or Green Card"
                    options={identities}
                    onOpenChange={setIdentityOpen}
                    onSelect={currentValue => {
                      setFieldValue(
                        'identity',
                        currentValue === values.identity ? '' : currentValue,
                      );
                      setIdentityOpen(false);
                    }}
                  />
                  <p className="text-sm text-red-500">
                    {touched.identity && errors.identity}
                  </p>
                </div>
              )}
            </div>
            {values.citizen === 'no' && (
              <div className="flex my-5 justify-between items-end w-full">
                <div className="flex flex-col w-2/5">
                  <Combobox
                    open={visaOpen}
                    value={values.visa}
                    buttonText="What is your work authorization?"
                    options={visaTypes}
                    onOpenChange={setVisaOpen}
                    onSelect={currentValue => {
                      const value =
                        currentValue === values.visa ? '' : currentValue;
                      if (value !== 'f1') {
                        setFieldValue('receipt', '');
                        setReceiptFile(null);
                      }
                      if (value !== 'other') {
                        setFieldValue('visaType', '');
                      }
                      setFieldValue('visa', value);
                      setVisaOpen(false);
                    }}
                  />
                  <p className="text-sm text-red-500">
                    {touched.visa && errors.visa}
                  </p>
                </div>
                <div className="flex flex-col w-1/5">
                  <Label className="my-1 text-md font-semibold">
                    Start Date
                  </Label>
                  <DatePicker
                    value={values.startDate}
                    onSelect={(date: Date | undefined) => {
                      setFieldValue('startDate', date);
                    }}
                  />
                  <p className="text-sm text-red-500">
                    {touched.startDate && errors.startDate}
                  </p>
                </div>
                <div className="flex flex-col w-1/5">
                  <Label className="my-1 text-md font-semibold">End Date</Label>
                  <DatePicker
                    value={values.endDate}
                    onSelect={(date: Date | undefined) => {
                      setFieldValue('endDate', date);
                    }}
                  />
                  <p className="text-sm text-red-500">
                    {touched.endDate && errors.endDate}
                  </p>
                </div>
              </div>
            )}
            {values.visa === 'other' && (
              <div className="flex my-5 justify-between w-full">
                <div className="flex flex-col w-1/2">
                  <Input
                    name="visaType"
                    value={values.visaType}
                    onChange={handleChange}
                    type="text"
                    placeholder="Specify visa type"
                  />
                  <p className="text-sm text-red-500">
                    {touched.visaType && errors.visaType}
                  </p>
                </div>
              </div>
            )}
            {values.visa === 'f1' && (
              <div className="flex my-5 justify-between w-full">
                <div className="flex flex-col w-1/2">
                  <Label className="my-1 text-md font-semibold">
                    OPT Receipt
                  </Label>
                  <Input
                    onChange={handleFileChange(
                      500000000,
                      setReceiptFile,
                      setFieldValue,
                      'receipt',
                      token,
                    )}
                    type="file"
                    accept="application/pdf"
                  />
                  <p className="text-sm text-red-500">
                    {touched.receipt && errors.receipt}
                  </p>
                </div>
              </div>
            )}
            <Separator className="my-2 self-center" />
            <header className="my-5">
              <Checkbox
                className="mr-2"
                name="reference"
                checked={values.reference}
                onCheckedChange={() => {
                  setFieldValue('reference', !values.reference);
                }}
              />
              <Label className="text-2xl font-semibold" htmlFor="reference">
                Reference Information
              </Label>
            </header>
            {values.reference && (
              <>
                <div className="flex my-5 justify-between w-full">
                  <div className="flex flex-col w-1/4">
                    <Label className="my-1 text-md font-semibold">
                      First Name*
                    </Label>
                    <Input
                      name="referenceFirstName"
                      value={values.referenceFirstName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter first name"
                    />
                    <p className="text-sm text-red-500">
                      {touched.referenceFirstName && errors.referenceFirstName}
                    </p>
                  </div>
                  <div className="flex flex-col w-1/4">
                    <Label className="my-1 text-md font-semibold">
                      Middle Name
                    </Label>
                    <Input
                      name="referenceMiddleName"
                      value={values.referenceMiddleName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter middle name"
                    />
                    <p className="text-sm text-red-500">
                      {touched.referenceMiddleName &&
                        errors.referenceMiddleName}
                    </p>
                  </div>
                  <div className="flex flex-col w-1/4">
                    <Label className="my-1 text-md font-semibold">
                      Last Name*
                    </Label>
                    <Input
                      name="referenceLastName"
                      value={values.referenceLastName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter last name"
                    />
                    <p className="text-sm text-red-500">
                      {touched.referenceLastName && errors.referenceLastName}
                    </p>
                  </div>
                </div>
                <div className="flex my-5 justify-between w-full">
                  <div className="flex flex-col w-1/3">
                    <Label className="my-1 text-md font-semibold">Email</Label>
                    <Input
                      name="referenceEmail"
                      value={values.referenceEmail}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter email address"
                    />
                    <p className="text-sm text-red-500">
                      {touched.referenceEmail && errors.referenceEmail}
                    </p>
                  </div>
                  <div className="flex flex-col w-1/3">
                    <Label className="my-1 text-md font-semibold">Phone</Label>
                    <Input
                      name="referencePhone"
                      value={values.referencePhone}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter phone number"
                    />
                    <p className="text-sm text-red-500">
                      {touched.referencePhone && errors.referencePhone}
                    </p>
                  </div>
                  <div className="flex flex-col w-1/4">
                    <Label className="my-1 text-md font-semibold">
                      Relationship*
                    </Label>
                    <Input
                      name="referenceRelationship"
                      value={values.referenceRelationship}
                      onChange={handleChange}
                      type="text"
                      placeholder="Indicate relationship"
                    />
                    <p className="text-sm text-red-500">
                      {touched.referenceRelationship &&
                        errors.referenceRelationship}
                    </p>
                  </div>
                </div>
              </>
            )}
            <Separator className="my-2 self-center" />
            <header className="text-2xl font-semibold my-5">
              Emergency Contact
            </header>
            {values.emergencyContact.map((contact, index) => {
              const firstName = `emergencyContact[${index}].firstName`;
              const middleName = `emergencyContact[${index}].middleName`;
              const lastName = `emergencyContact[${index}].lastName`;
              const email = `emergencyContact[${index}].email`;
              const phone = `emergencyContact[${index}].phone`;
              const relationship = `emergencyContact[${index}].relationship`;

              return (
                <div key={contact.id}>
                  <div className="flex my-5 justify-between w-full">
                    <div className="flex flex-col w-1/4">
                      <Label className="my-1 text-md font-semibold">
                        First Name*
                      </Label>
                      <Input
                        value={contact.firstName || ''}
                        name={firstName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter first name"
                      />
                      <p className="text-sm text-red-500">
                        {touched.emergencyContact &&
                          // @ts-ignore
                          errors.emergencyContact?.[index]?.firstName}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/4">
                      <Label className="my-1 text-md font-semibold">
                        Middle Name
                      </Label>
                      <Input
                        value={contact.middleName || ''}
                        name={middleName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter middle name"
                      />
                      <p className="text-sm text-red-500">
                        {touched.emergencyContact &&
                          // @ts-ignore
                          errors.emergencyContact?.[index]?.middleName}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/4">
                      <Label className="my-1 text-md font-semibold">
                        Last Name*
                      </Label>
                      <Input
                        value={contact.lastName || ''}
                        name={lastName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter last name"
                      />
                      <p className="text-sm text-red-500">
                        {touched.emergencyContact &&
                          // @ts-ignore
                          errors.emergencyContact?.[index]?.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex my-5 justify-between w-full">
                    <div className="flex flex-col w-1/3">
                      <Label className="my-1 text-md font-semibold">
                        Email
                      </Label>
                      <Input
                        value={contact.email || ''}
                        name={email}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter email address"
                      />
                      <p className="text-sm text-red-500">
                        {touched.emergencyContact &&
                          // @ts-ignore
                          errors.emergencyContact?.[index]?.email}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/3">
                      <Label className="my-1 text-md font-semibold">
                        Phone
                      </Label>
                      <Input
                        value={contact.phone || ''}
                        name={phone}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter phone number"
                      />
                      <p className="text-sm text-red-500">
                        {touched.emergencyContact &&
                          // @ts-ignore
                          errors.emergencyContact?.[index]?.phone}
                      </p>
                    </div>
                    <div className="flex flex-col w-1/4">
                      <Label className="my-1 text-md font-semibold">
                        Relationship*
                      </Label>
                      <Input
                        value={contact.relationship || ''}
                        name={relationship}
                        onChange={handleChange}
                        type="text"
                        placeholder="Indicate relationship"
                      />
                      <p className="text-sm text-red-500">
                        {touched.emergencyContact &&
                          // @ts-ignore
                          errors.emergencyContact?.[index].relationship}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    type="button"
                    className="text-blue-600 self-start p-0"
                    onClick={() => {
                      const newEmergencyContact =
                        values.emergencyContact.filter((_, i) => i !== index);
                      setFieldValue('emergencyContact', newEmergencyContact);
                    }}
                  >
                    -remove
                  </Button>
                </div>
              );
            })}
            <Button
              variant="link"
              type="button"
              className="text-blue-600 self-start p-0"
              onClick={() => {
                const newEmergencyContact = [
                  ...values.emergencyContact,
                  {
                    id: Math.random(),
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    relationship: '',
                  },
                ];
                setFieldValue('emergencyContact', newEmergencyContact);
              }}
            >
              +add new
            </Button>
            {(avatarImage || receiptFile) && (
              <>
                <Separator className="my-2 self-center" />
                <header className="text-2xl font-semibold my-5">
                  Upload Documents
                </header>
                <ul className="flex flex-col w-full">
                  {avatarImage && (
                    <li className="flex my-2 justify-between items-center">
                      <p>Profile Picture</p>
                      <p>{avatarImage.name}</p>
                      <a
                        className="text-blue-600 underline"
                        href={values.avatar}
                        target="_blank"
                        rel="noreferrer"
                      >
                        preview
                      </a>
                      <a
                        className="text-blue-600 underline"
                        href={values.avatar}
                        download={avatarImage.name}
                      >
                        download
                      </a>
                    </li>
                  )}
                  {receiptFile && (
                    <li className="flex my-2 justify-between items-center">
                      <p>OPT Receipt</p>
                      <p>{receiptFile.name}</p>
                      <a
                        className="text-blue-600 underline"
                        href={values.receipt}
                        target="_blank"
                        rel="noreferrer"
                      >
                        preview
                      </a>
                      <a
                        className="text-blue-600 underline"
                        href={values.receipt}
                        download={receiptFile.name}
                      >
                        download
                      </a>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
          <Button
            disabled={submitLoading}
            type="submit"
            className="w-1/5 mx-auto mt-3 mb-16"
          >
            {submitLoading && <Loader2 className="animate-spin mr-2" />}
            Submit
          </Button>
        </fieldset>
      </form>
    </div>
  );
};

export default Onboarding;
