import { gql } from "../__gql__/gql";

const GET_CONVERSATIONS = gql(`
  query conversations($first: Int, $after: String) {
    conversations(first: $first, after: $after) {
      edges {
        node {
          ...ConversationFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export default GET_CONVERSATIONS;
