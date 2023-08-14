import { gql } from "../../__gql__";

const USER_FIELDS_FRAGMENT = gql(`
  fragment UserFields on User {
    id
    name
    avatar
    initials
}
`);

export default USER_FIELDS_FRAGMENT;
