import { gql } from '@apollo/client';

export const QUERY_VISA = gql`
  query Visa {
    visa {
      visaTitle
      optReceipt {
        feedback
        url
        status
      }
      optEad {
        feedback
        url
        status
      }
      i983 {
        feedback
        url
        status
      }
      i20 {
        feedback
        url
        status
      }
    }
  }
`;

export const UPDATE_VISA = gql`
  mutation UpdateVisaStatus($fileType: String!, $uri: String!) {
    updateVisaStatus(fileType: $fileType, uri: $uri) {
      api
      type
      status
      message
    }
  }
`;
