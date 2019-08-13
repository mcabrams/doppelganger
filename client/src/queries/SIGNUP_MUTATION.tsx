import gql from 'graphql-tag';

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      ...SignupResponse
    }
  }

  fragment SignupResponse on AuthPayload {
    token
  }
`;
