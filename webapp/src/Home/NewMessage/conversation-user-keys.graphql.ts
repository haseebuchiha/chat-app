import { gql } from "../../__gql__";

const CONVERSATION_USER_KEYS_QUERY = gql(`
  query conversationUserKeys($id: ID!) {
    conversationUserKeys(id: $id)
  }
`);

export default CONVERSATION_USER_KEYS_QUERY;
