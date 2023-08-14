import { gql } from "../../../__gql__";

const USER_HAS_KEY_QUERY = gql(`
  query userHasKey($key: String!) {
    userHasKey(key: $key)
  }
`);
export default USER_HAS_KEY_QUERY;
