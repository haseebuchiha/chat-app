import { gql } from "../../__gql__";

const userFields = gql(`
  fragment UserFields on User {
    id
    name
    avatar
    initials
}
`);

export default userFields;
