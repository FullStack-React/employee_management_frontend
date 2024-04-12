import { gql } from '@apollo/client';

export const FETCH = gql`
  query Employee {
    employee {
      _id
      firstName
      lastName
      middleName
      preferredName
      email
      ssn
      dateOfBirth
      gender
      apartment
      streetAddress
      city
      state
      zip
      cellPhone
      workPhone
      citizenship
      visaType
      visaStartDate
      visaEndDate
      referralFirstName
      referralMiddleName
      referralLastName
      referralEmail
      referralPhone
      referralRelationship
      emergencyContacts {
        id
        firstName
        lastName
        middleName
        relationship
        email
        phone
      }
      documents {
        file
        type
      }
    }
  }
`;

export const UPDATE_NAME_SECTION = gql`
  mutation UpdateNameSection($data: NameSectionInput!) {
    updateNameSection(data: $data) {
      api
      type
      status
      message
    }
  }
`;

export const UPDATE_ADDRESS_SECTION = gql`
  mutation UpdateAddressSection($data: AddressSectionInput!) {
    updateAddressSection(data: $data) {
      api
      type
      status
      message
    }
  }
`;

export const UPDATE_CONTACT_SECTION = gql`
  mutation UpdateContactSection($data: ContactSectionInput!) {
    updateContactSection(data: $data) {
      api
      type
      status
      message
    }
  }
`;

export const UPDATE_EMPLOYMENT_SECTION = gql`
  mutation UpdateEmploymentSection($data: EmploymentSectionInput!) {
    updateEmploymentSection(data: $data) {
      api
      type
      status
      message
    }
  }
`;

export const UPDATE_EMERGENCY_SECTION = gql`
  mutation UpdateEmergencyContactSection($data: EmergencyContactSectionInput!) {
    updateEmergencyContactSection(data: $data) {
      api
      type
      status
      message
    }
  }
`;
