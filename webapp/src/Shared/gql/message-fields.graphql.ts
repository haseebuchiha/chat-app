import { gql } from "../../__gql__";
// import userFields from "./user-fields"

const messageFields = gql(`
  fragment MessageFields on Message {
    body
    id
    createdAt
    isAuthor
  }
`);

export default messageFields;
