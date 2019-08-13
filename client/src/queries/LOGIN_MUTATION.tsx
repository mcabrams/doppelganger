import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...LoginResponse
    }
  }

  fragment LoginResponse on AuthPayload {
    token
  }
`;
