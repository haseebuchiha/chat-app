import { gql } from "../../__gql__/gql";

const GET_CONVERSATION_MESSAGES = gql(`
  query conversationMessages($conversationId: ID!, $first: Int, $after: String) {
    conversationMessages(conversationId: $conversationId, first: $first, after: $after) {
      edges {
        node {
          ...MessageFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export default GET_CONVERSATION_MESSAGES;
