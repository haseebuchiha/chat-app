import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Operation,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { createConsumer } from "@rails/actioncable";
import { OperationDefinitionNode } from "graphql";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";
import { some } from "lodash/fp";

let WSS_CLIENT_URL = "/cable";
if (window._env_.BASE_DOMAIN) {
  if (window.location.protocol === "https:") {
    WSS_CLIENT_URL = `wss://${window._env_.BASE_DOMAIN}${WSS_CLIENT_URL}`;
  } else {
    WSS_CLIENT_URL = `ws://${window._env_.BASE_DOMAIN}${WSS_CLIENT_URL}`;
  }
}

let uri = "/graphql";
if (window._env_.BASE_DOMAIN) {
  uri = `${window.location.protocol}//${window._env_.BASE_DOMAIN}${uri}`;
}


const cable = createConsumer(WSS_CLIENT_URL);

const httpLink = new HttpLink({
  uri,
  credentials: "include",
});

const isSubscription = some(
  (definition: OperationDefinitionNode) =>
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription",
);

const hasSubscriptionOperation = ({ query: { definitions } }: Operation) =>
  isSubscription(definitions);
const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({ cable }),
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          conversationMessages: relayStylePagination(["conversationId"]),
          conversations: relayStylePagination(),
        },
      },
    },
  }),
});

export default client;
