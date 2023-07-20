import { gql } from "../../__gql__";
// import userFields from "./user-fields"

const conversationFields = gql(`
  fragment ConversationFields on Conversation {
    id
    createdAt
    updatedAt
    user {
      ...UserFields
    }
    message {
      id
      body
      createdAt
    }
  }
  `);

export default conversationFields;
