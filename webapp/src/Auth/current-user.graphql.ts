import { gql } from "../__gql__/gql";

const CURRENT_USER = gql(/* GraphQL */ `
  query currentUser {
    currentUser {
      ...UserFields
      email
    }
  }
`);

export default CURRENT_USER;
