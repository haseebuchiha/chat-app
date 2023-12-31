import React, { useEffect } from "react";
import GET_CONVERSATION_MESSAGES from "./messages.graphql";
import { useQuery } from "@apollo/client";
import { map, toString, uniqWith } from "lodash/fp";
import Message from "../Message";
import { Box, CircularProgress } from "@chakra-ui/react";
import {
  MessageFieldsFragment,
  UserFieldsFragment,
} from "../../__gql__/graphql";
import ErrorAlert from "../../Shared/Components/ErrorAlert";
import MESSAGE_WAS_POSTED_SUBSCRIPTION from "./message-posted.graphql";
import useInifiteScrolling from "../../Shared/hooks/useInifiniteScrolling";
import { useParams } from "react-router-dom";
interface Edge {
  __typename?: "MessageEdge" | undefined;
  node: {
    __typename?: "Message" | undefined;
  } & MessageFieldsFragment;
}
const uniqById = uniqWith(
  (edge1: Edge, edge2: Edge) => edge1.node.id === edge2.node.id,
);

const Messages: React.FC = () => {
  const { id } = useParams();
  const { data, error, loading, subscribeToMore, fetchMore } = useQuery(
    GET_CONVERSATION_MESSAGES,
    {
      variables: { conversationId: id || "", first: 10 },
      skip: !id,
    },
  );

  const { loadingMore, observerTarget } = useInifiteScrolling({
    hasNextPage: data?.conversationMessages?.pageInfo.hasNextPage,
    endCursor: data?.conversationMessages?.pageInfo.endCursor,
    fetchMore,
  });

  useEffect(() => {
    if (subscribeToMore && id) {
      subscribeToMore({
        document: MESSAGE_WAS_POSTED_SUBSCRIPTION,
        variables: { conversationId: id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data?.messageWasSent?.message) {
            return prev;
          }
          const newMessage = subscriptionData.data.messageWasSent
            ?.message as MessageFieldsFragment;
          return Object.assign({}, prev, {
            conversationMessages: {
              ...prev.conversationMessages,
              edges: uniqById([
                {
                  node: newMessage,
                },
                ...((prev.conversationMessages?.edges as Edge[]) || []),
              ]),
            },
          });
        },
      });
    }
  }, [id, subscribeToMore]);
  if (!id) {
    return <></>;
  }
  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  return (
    <>
      {loading ? (
        <CircularProgress
          position="absolute"
          top="50%"
          left="50%"
          isIndeterminate
          color="green.300"
        />
      ) : (
        <>
          {map(
            ({
              node,
            }: {
              node: MessageFieldsFragment & { user: UserFieldsFragment };
            }) => (
              <Message
                author={node.isAuthor}
                key={`message-${toString(node?.id)}`}
                node={node}
              />
            ),
            data?.conversationMessages?.edges,
          )}
        </>
      )}
      {loadingMore && (
        <CircularProgress
          isIndeterminate
          size={7}
          color="green.300"
          alignSelf="center"
        />
      )}
      <Box ref={observerTarget} />
    </>
  );
};

export default Messages;
