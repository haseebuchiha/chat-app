import { gql } from "../../__gql__";

const LOGIN = gql(`
  mutation login($email: String!, $password: String) {
    login(email: $email, password: $password) {
      user {
        ...UserFields
        email
      }
    }
  }
`);

export default LOGIN;
