import { gql } from "../../__gql__";

const MESSAGE_WAS_POSTED_SUBSCRIPTION = gql(`
  subscription messageWasSent($conversationId: ID!) {
    messageWasSent(conversationId: $conversationId) {
      message {
        ...MessageFields
      }
    }
  }
`);

export default MESSAGE_WAS_POSTED_SUBSCRIPTION;
