/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  mutation login($email: String!, $password: String) {\n    login(email: $email, password: $password) {\n      user {\n        ...UserFields\n        email\n      }\n    }\n  }\n":
    types.LoginDocument,
  "\n  query currentUser {\n    currentUser {\n      ...UserFields\n      email\n    }\n  }\n":
    types.CurrentUserDocument,
  "\n  subscription messageWasSent($conversationId: ID!) {\n    messageWasSent(conversationId: $conversationId) {\n      message {\n        ...MessageFields\n      }\n    }\n  }\n":
    types.MessageWasSentDocument,
  "\n  query conversationMessages($conversationId: ID!, $first: Int, $after: String) {\n    conversationMessages(conversationId: $conversationId, first: $first, after: $after) {\n      edges {\n        node {\n          ...MessageFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n":
    types.ConversationMessagesDocument,
  "\n  mutation sendMessage($conversationId: ID!, $body: String!) {\n    sendMessage(conversationId: $conversationId, body: $body) {\n      ...MessageFields\n    }\n  }\n":
    types.SendMessageDocument,
  "\n  query conversations($first: Int, $after: String) {\n    conversations(first: $first, after: $after) {\n      edges {\n        node {\n          ...ConversationFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n":
    types.ConversationsDocument,
  "\n  fragment ConversationFields on Conversation {\n    id\n    createdAt\n    updatedAt\n    user {\n      ...UserFields\n    }\n    message {\n      id\n      body\n      createdAt\n    }\n  }\n  ":
    types.ConversationFieldsFragmentDoc,
  "\n  fragment MessageFields on Message {\n    body\n    id\n    createdAt\n    isAuthor\n  }\n":
    types.MessageFieldsFragmentDoc,
  "\n  fragment UserFields on User {\n    id\n    name\n    avatar\n    initials\n}\n":
    types.UserFieldsFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation login($email: String!, $password: String) {\n    login(email: $email, password: $password) {\n      user {\n        ...UserFields\n        email\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation login($email: String!, $password: String) {\n    login(email: $email, password: $password) {\n      user {\n        ...UserFields\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query currentUser {\n    currentUser {\n      ...UserFields\n      email\n    }\n  }\n",
): (typeof documents)["\n  query currentUser {\n    currentUser {\n      ...UserFields\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  subscription messageWasSent($conversationId: ID!) {\n    messageWasSent(conversationId: $conversationId) {\n      message {\n        ...MessageFields\n      }\n    }\n  }\n",
): (typeof documents)["\n  subscription messageWasSent($conversationId: ID!) {\n    messageWasSent(conversationId: $conversationId) {\n      message {\n        ...MessageFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query conversationMessages($conversationId: ID!, $first: Int, $after: String) {\n    conversationMessages(conversationId: $conversationId, first: $first, after: $after) {\n      edges {\n        node {\n          ...MessageFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n",
): (typeof documents)["\n  query conversationMessages($conversationId: ID!, $first: Int, $after: String) {\n    conversationMessages(conversationId: $conversationId, first: $first, after: $after) {\n      edges {\n        node {\n          ...MessageFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation sendMessage($conversationId: ID!, $body: String!) {\n    sendMessage(conversationId: $conversationId, body: $body) {\n      ...MessageFields\n    }\n  }\n",
): (typeof documents)["\n  mutation sendMessage($conversationId: ID!, $body: String!) {\n    sendMessage(conversationId: $conversationId, body: $body) {\n      ...MessageFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query conversations($first: Int, $after: String) {\n    conversations(first: $first, after: $after) {\n      edges {\n        node {\n          ...ConversationFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n",
): (typeof documents)["\n  query conversations($first: Int, $after: String) {\n    conversations(first: $first, after: $after) {\n      edges {\n        node {\n          ...ConversationFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment ConversationFields on Conversation {\n    id\n    createdAt\n    updatedAt\n    user {\n      ...UserFields\n    }\n    message {\n      id\n      body\n      createdAt\n    }\n  }\n  ",
): (typeof documents)["\n  fragment ConversationFields on Conversation {\n    id\n    createdAt\n    updatedAt\n    user {\n      ...UserFields\n    }\n    message {\n      id\n      body\n      createdAt\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment MessageFields on Message {\n    body\n    id\n    createdAt\n    isAuthor\n  }\n",
): (typeof documents)["\n  fragment MessageFields on Message {\n    body\n    id\n    createdAt\n    isAuthor\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment UserFields on User {\n    id\n    name\n    avatar\n    initials\n}\n",
): (typeof documents)["\n  fragment UserFields on User {\n    id\n    name\n    avatar\n    initials\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;