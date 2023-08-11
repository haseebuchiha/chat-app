import { gql } from "../../__gql__";

const START_CONVERSATION_MUTATION = gql(`
  mutation startConversation($userId: ID!) {
    startConversation(userId: $userId) {
      id
    }
  }
`);

export default START_CONVERSATION_MUTATION;
