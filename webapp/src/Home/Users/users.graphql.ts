import { gql } from "../../__gql__";

const USERS_QUERY = gql(`
  query users($first: Int, $after: String, $query: String) {
    users(first: $first, after: $after, query: $query) {
      edges {
        node {
          ...UserFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export default USERS_QUERY;
