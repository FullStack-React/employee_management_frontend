import { gql } from '@apollo/client';

export const ONBOARDING = gql`
  mutation Onboarding($data: OnboardingDataInput!) {
    onboarding(data: $data) {
      api
      type
      status
      message
    }
  }
`;

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
