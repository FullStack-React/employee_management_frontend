import { object, string, date, array, boolean, ref } from 'yup';

export const validationSchema = object({
  avatar: string().required(),
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  middleName: string(),
  preferredName: string(),
  street: string().required('Street is required'),
  apt: string(),
  city: string().required('City is required'),
  state: string().required('State is required'),
  zip: string().required('Zip code is required'),
  email: string().email('Invalid email address').required('Email is required'),
  phone: string()
    .matches(/^\d{10}$/, { message: 'Invalid phone number' })
    .required('Phone number is required'),
  ssn: string()
    .matches(/^\d{9}$/, { message: 'Invalid SSN' })
    .required('SSN is required'),
  dateOfBirth: date().required('Date of birth is required'),
  gender: string().required('gender is required'),
  citizen: string().required('Citizenship status is required'),
  identity: string().when('citizen', {
    is: 'yes',
    then: schema => schema.required('Identity is required'),
  }),
  visa: string().when('citizen', {
    is: 'no',
    then: schema => schema.required('Visa status is required'),
  }),
  startDate: date().when('citizen', {
    is: 'no',
    then: schema => schema.required('Start date is required'),
  }),
  endDate: date()
    .when('citizen', {
      is: 'no',
      then: schema => schema.required('End date is required'),
    })
    .min(ref('startDate'), 'End date must be after start date'),
  visaType: string().when('visa', {
    is: 'other',
    then: schema => schema.required('Visa type is required'),
  }),
  receipt: string().when('visa', {
    is: 'f1',
    then: schema => schema.required('OPT receipt is required'),
  }),
  reference: boolean(),
  referenceFirstName: string().when('reference', {
    is: true,
    then: schema => schema.required('First name is required'),
  }),
  referenceMiddleName: string(),
  referenceLastName: string().when('reference', {
    is: true,
    then: schema => schema.required('Last name is required'),
  }),
  referenceEmail: string().when('reference', {
    is: true,
    then: schema => schema.email('Invalid email address'),
  }),
  referencePhone: string().when('reference', {
    is: true,
    then: schema =>
      schema.matches(/^\d{10}$/, { message: 'Invalid phone number' }),
  }),
  referenceRelationship: string().when('reference', {
    is: true,
    then: schema => schema.required('Relationship is required'),
  }),
  emergencyContact: array()
    .of(
      object({
        firstName: string().required('First name is required'),
        middleName: string(),
        lastName: string().required('Last name is required'),
        email: string().email('Invalid email address'),
        phone: string().matches(/^\d{10}$/, {
          message: 'Invalid phone number',
        }),
        relationship: string().required('Relationship is required'),
      }),
    )
    .required('Emergency contact is required'),
});
