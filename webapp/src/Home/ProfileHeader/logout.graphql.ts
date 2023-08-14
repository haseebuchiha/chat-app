import { gql } from "../../__gql__";

const LOGOUT_MUTATION = gql(`
  mutation logout($key: String!) {
    logout(key: $key)
}`);

export default LOGOUT_MUTATION;
