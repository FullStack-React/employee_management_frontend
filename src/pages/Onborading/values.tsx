export const initialValues = {
  avatar: 'https://github.com/shadcn.png',
  firstName: '',
  lastName: '',
  middleName: '',
  preferredName: '',
  street: '',
  apt: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  phone: '',
  ssn: '',
  dateOfBirth: undefined,
  gender: '',
  citizen: '',
  identity: '',
  visa: '',
  startDate: undefined,
  endDate: undefined,
  visaType: '',
  receipt: '',
  reference: false,
  referenceFirstName: '',
  referenceMiddleName: '',
  referenceLastName: '',
  referenceEmail: '',
  referencePhone: '',
  referenceRelationship: '',
  emergencyContact: [
    {
      id: Math.random(),
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      relationship: '',
    },
  ],
};
