import { gql } from "../../__gql__";

const SEND_MESSAGE = gql(/* GraphQL */ `
  mutation sendMessage($conversationId: ID!, $body: String!) {
    sendMessage(conversationId: $conversationId, body: $body) {
      ...MessageFields
    }
  }
`);

export default SEND_MESSAGE;
