import { Box, CircularProgress } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { first, map } from "lodash/fp";
import {
  ConversationFieldsFragment,
  MessageFieldsFragment,
  UserFieldsFragment,
} from "../../__gql__/graphql";
import Conversation from "../Conversation";
import useInifiteScrolling from "../../Shared/hooks/useInifiniteScrolling";
import GET_CONVERSATIONS from "./conversations.graphql";
import { useQuery } from "@apollo/client";
import ErrorAlert from "../../Shared/Components/ErrorAlert";
import Loader from "../../Shared/Components/Loader";
import { useNavigate, useParams } from "react-router-dom";

interface ConversationType extends ConversationFieldsFragment {
  user: UserFieldsFragment;
  message: MessageFieldsFragment;
}

const Conversations: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error, fetchMore } = useQuery(GET_CONVERSATIONS, {
    variables: {
      first: 10,
    },
  });
  const { loadingMore, observerTarget } = useInifiteScrolling({
    hasNextPage: data?.conversations?.pageInfo.hasNextPage,
    endCursor: data?.conversations?.pageInfo.endCursor,
    fetchMore,
  });
  useEffect(() => {
    const node = first(data?.conversations?.edges)?.node as ConversationType;
    if (node && navigate && !id) {
      navigate(`/conversations/${node.id}`);
    }
  }, [data, navigate, id]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  return (
    <>
      {map(
        ({ node }: { node: ConversationType }) => (
          <Conversation
            onClick={() => navigate(`/conversations/${node.id}`)}
            selected={id === node.id}
            key={`con-${node?.id}`}
            node={node}
          />
        ),
        data?.conversations?.edges,
      )}
      {loadingMore && <CircularProgress isIndeterminate color="green.300" />}
      <Box ref={observerTarget} />
    </>
  );
};

export default Conversations;
