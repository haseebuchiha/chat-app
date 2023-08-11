import { gql } from "../../__gql__";

const LOGOUT_MUTATION = gql(`
  mutation Logout {
    logout
}`);

export default LOGOUT_MUTATION;
