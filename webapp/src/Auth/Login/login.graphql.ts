import { gql } from "../../__gql__";

const LOGIN_MUTATION = gql(`
  mutation login($email: String!, $password: String) {
    login(email: $email, password: $password) {
      user {
        ...UserFields
        email
      }
    }
  }
`);

export default LOGIN_MUTATION;
