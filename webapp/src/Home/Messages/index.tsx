import React, { useEffect, useRef } from "react";
import GET_CONVERSATION_MESSAGES from "./messages.graphql";
import { useQuery } from "@apollo/client";
import { map, toString, uniqBy } from "lodash/fp";
import Message from "../Message";
import { Box, CircularProgress } from "@chakra-ui/react";
import {
  MessageFieldsFragment,
  UserFieldsFragment,
} from "../../__gql__/graphql";
import ErrorAlert from "../../Shared/Components/ErrorAlert";
import MESSAGE_WAS_POSTED_SUBSCRIPTION from "./message-posted.graphql";
import useInifiteScrolling from "../../Shared/hooks/useInifiniteScrolling";

interface MessageProps {
  conversationId: string;
}
const Messages: React.FC<MessageProps> = React.memo(
  ({ conversationId }) => {
    const { data, error, loading, subscribeToMore, fetchMore } = useQuery(
      GET_CONVERSATION_MESSAGES,
      {
        variables: { conversationId, first: 10 },
      },
    );

    const observerTarget = useRef(null);
    const { loadingMore } = useInifiteScrolling({
      observerTarget,
      hasNextPage: data?.conversationMessages?.pageInfo.hasNextPage,
      endCursor: data?.conversationMessages?.pageInfo.endCursor,
      fetchMore,
    });

    useEffect(() => {
      if (subscribeToMore) {
        subscribeToMore({
          document: MESSAGE_WAS_POSTED_SUBSCRIPTION,
          variables: { conversationId },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data?.messageWasSent?.message) {
              return prev;
            }
            const newMessage = subscriptionData.data.messageWasSent?.message;
            return Object.assign({}, prev, {
              conversationMessages: {
                ...prev.conversationMessages,
                edges: uniqBy("id", [
                  {
                    node: newMessage,
                  },
                  ...(prev.conversationMessages?.edges || []),
                ]),
              },
            });
          },
        });
      }
    }, [conversationId, subscribeToMore]);
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
  },
  (prevProps, nextProps) =>
    prevProps.conversationId === nextProps.conversationId,
);

export default Messages;
