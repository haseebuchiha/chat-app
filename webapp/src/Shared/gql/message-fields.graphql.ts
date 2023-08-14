import { gql } from "../../__gql__";
// import userFields from "./user-fields"

const MESSAGE_FIELDS_FRAGMENT = gql(`
  fragment MessageFields on Message {
    body
    id
    createdAt
    isAuthor
    status
  }
`);

export default MESSAGE_FIELDS_FRAGMENT;
