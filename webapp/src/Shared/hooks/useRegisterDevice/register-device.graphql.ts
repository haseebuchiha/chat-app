import { gql } from "../../../__gql__";

const REGISTER_DEVICE = gql(`
  mutation registerDevice($name: String!, $key: String!) {
    registerDevice(name: $name, key: $key)
  }
`);

export default REGISTER_DEVICE;
