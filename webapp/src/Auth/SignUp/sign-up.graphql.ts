import { gql } from "../../__gql__";

const SIGNUP_MUTATION = gql(`
  mutation signUp($email: String!, $password: String!, $passwordConfirmation: String!, $firstname: String!, $lastname: String!) {
    signUp(email: $email, password: $password, passwordConfirmation: $passwordConfirmation, firstname: $firstname, lastname: $lastname) {
      message
    }
  }
`);

export default SIGNUP_MUTATION;
