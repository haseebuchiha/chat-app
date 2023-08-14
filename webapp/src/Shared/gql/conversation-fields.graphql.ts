import { gql } from "../../__gql__";
// import userFields from "./user-fields"

const CONVERSATION_FIELDS_FRAGMENT = gql(`
  fragment ConversationFields on Conversation {
    id
    createdAt
    updatedAt
    user {
      ...UserFields
    }
    message {
      ...MessageFields
    }
  }
  `);

export default CONVERSATION_FIELDS_FRAGMENT;
