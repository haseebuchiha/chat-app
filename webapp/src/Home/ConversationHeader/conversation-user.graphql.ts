import { gql } from "../../__gql__/gql";

const GET_CONVERSATION_USER = gql(`
  query conversationUser($id: ID!) {
    conversationUser(id: $id) {
      ...UserFields
    }
  }
`);

export default GET_CONVERSATION_USER;
