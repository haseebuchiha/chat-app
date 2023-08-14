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
  "\n  mutation signUp($email: String!, $password: String!, $passwordConfirmation: String!, $firstname: String!, $lastname: String!) {\n    signUp(email: $email, password: $password, passwordConfirmation: $passwordConfirmation, firstname: $firstname, lastname: $lastname) {\n      message\n    }\n  }\n":
    types.SignUpDocument,
  "\n  query currentUser {\n    currentUser {\n      ...UserFields\n      email\n    }\n  }\n":
    types.CurrentUserDocument,
  "\n  query conversationUser($id: ID!) {\n    conversationUser(id: $id) {\n      ...UserFields\n    }\n  }\n":
    types.ConversationUserDocument,
  "\n  query conversations($first: Int, $after: String) {\n    conversations(first: $first, after: $after) {\n      edges {\n        node {\n          ...ConversationFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n":
    types.ConversationsDocument,
  "\n  subscription messageWasSent($conversationId: ID!) {\n    messageWasSent(conversationId: $conversationId) {\n      message {\n        ...MessageFields\n      }\n    }\n  }\n":
    types.MessageWasSentDocument,
  "\n  query conversationMessages($conversationId: ID!, $first: Int, $after: String) {\n    conversationMessages(conversationId: $conversationId, first: $first, after: $after) {\n      edges {\n        node {\n          ...MessageFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n":
    types.ConversationMessagesDocument,
  "\n  query conversationUserKeys($id: ID!) {\n    conversationUserKeys(id: $id)\n  }\n":
    types.ConversationUserKeysDocument,
  "\n  mutation sendMessage($conversationId: ID!, $body: String!) {\n    sendMessage(conversationId: $conversationId, body: $body) {\n      ...MessageFields\n    }\n  }\n":
    types.SendMessageDocument,
  "\n  mutation logout($key: String!) {\n    logout(key: $key)\n}":
    types.LogoutDocument,
  "\n  mutation startConversation($userId: ID!) {\n    startConversation(userId: $userId) {\n      id\n    }\n  }\n":
    types.StartConversationDocument,
  "\n  query users($first: Int, $after: String, $query: String) {\n    users(first: $first, after: $after, query: $query) {\n      edges {\n        node {\n          ...UserFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n":
    types.UsersDocument,
  "\n  fragment ConversationFields on Conversation {\n    id\n    createdAt\n    updatedAt\n    user {\n      ...UserFields\n    }\n    message {\n      ...MessageFields\n    }\n  }\n  ":
    types.ConversationFieldsFragmentDoc,
  "\n  fragment MessageFields on Message {\n    body\n    id\n    createdAt\n    isAuthor\n    status\n  }\n":
    types.MessageFieldsFragmentDoc,
  "\n  fragment UserFields on User {\n    id\n    name\n    avatar\n    initials\n}\n":
    types.UserFieldsFragmentDoc,
  "\n  mutation registerDevice($name: String!, $key: String!) {\n    registerDevice(name: $name, key: $key)\n  }\n":
    types.RegisterDeviceDocument,
  "\n  query userHasKey($key: String!) {\n    userHasKey(key: $key)\n  }\n":
    types.UserHasKeyDocument,
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
  source: "\n  mutation signUp($email: String!, $password: String!, $passwordConfirmation: String!, $firstname: String!, $lastname: String!) {\n    signUp(email: $email, password: $password, passwordConfirmation: $passwordConfirmation, firstname: $firstname, lastname: $lastname) {\n      message\n    }\n  }\n",
): (typeof documents)["\n  mutation signUp($email: String!, $password: String!, $passwordConfirmation: String!, $firstname: String!, $lastname: String!) {\n    signUp(email: $email, password: $password, passwordConfirmation: $passwordConfirmation, firstname: $firstname, lastname: $lastname) {\n      message\n    }\n  }\n"];
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
  source: "\n  query conversationUser($id: ID!) {\n    conversationUser(id: $id) {\n      ...UserFields\n    }\n  }\n",
): (typeof documents)["\n  query conversationUser($id: ID!) {\n    conversationUser(id: $id) {\n      ...UserFields\n    }\n  }\n"];
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
  source: "\n  query conversationUserKeys($id: ID!) {\n    conversationUserKeys(id: $id)\n  }\n",
): (typeof documents)["\n  query conversationUserKeys($id: ID!) {\n    conversationUserKeys(id: $id)\n  }\n"];
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
  source: "\n  mutation logout($key: String!) {\n    logout(key: $key)\n}",
): (typeof documents)["\n  mutation logout($key: String!) {\n    logout(key: $key)\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation startConversation($userId: ID!) {\n    startConversation(userId: $userId) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  mutation startConversation($userId: ID!) {\n    startConversation(userId: $userId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query users($first: Int, $after: String, $query: String) {\n    users(first: $first, after: $after, query: $query) {\n      edges {\n        node {\n          ...UserFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n",
): (typeof documents)["\n  query users($first: Int, $after: String, $query: String) {\n    users(first: $first, after: $after, query: $query) {\n      edges {\n        node {\n          ...UserFields\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment ConversationFields on Conversation {\n    id\n    createdAt\n    updatedAt\n    user {\n      ...UserFields\n    }\n    message {\n      ...MessageFields\n    }\n  }\n  ",
): (typeof documents)["\n  fragment ConversationFields on Conversation {\n    id\n    createdAt\n    updatedAt\n    user {\n      ...UserFields\n    }\n    message {\n      ...MessageFields\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment MessageFields on Message {\n    body\n    id\n    createdAt\n    isAuthor\n    status\n  }\n",
): (typeof documents)["\n  fragment MessageFields on Message {\n    body\n    id\n    createdAt\n    isAuthor\n    status\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment UserFields on User {\n    id\n    name\n    avatar\n    initials\n}\n",
): (typeof documents)["\n  fragment UserFields on User {\n    id\n    name\n    avatar\n    initials\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation registerDevice($name: String!, $key: String!) {\n    registerDevice(name: $name, key: $key)\n  }\n",
): (typeof documents)["\n  mutation registerDevice($name: String!, $key: String!) {\n    registerDevice(name: $name, key: $key)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query userHasKey($key: String!) {\n    userHasKey(key: $key)\n  }\n",
): (typeof documents)["\n  query userHasKey($key: String!) {\n    userHasKey(key: $key)\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
