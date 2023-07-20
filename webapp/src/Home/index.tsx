import { Box, CircularProgress, Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import GET_CONVERSATIONS from "./conversations.graphql";
import { useQuery } from "@apollo/client";
import Conversation from "./Conversation";
import { first, map } from "lodash/fp";
import {
  ConversationFieldsFragment,
  MessageFieldsFragment,
  UserFieldsFragment,
} from "../__gql__/graphql";
import Messages from "./Messages";
import ErrorAlert from "../Shared/Components/ErrorAlert";
import NewMessage from "./NewMessage";
import ConversationHeader from "./ConversationHeader";
import useCurrentUser from "../Auth/hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../Shared/Components/UserAvatar";
import useInifiteScrolling from "../Shared/hooks/useInifiniteScrolling";

interface ConversationType extends ConversationFieldsFragment {
  user: UserFieldsFragment;
  message: MessageFieldsFragment;
}

const Home: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_CONVERSATIONS, {
    variables: {
      first: 10,
    },
  });
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] =
    React.useState<ConversationType | null>(null);
  const { currentUser, loading: userLoading } = useCurrentUser();
  const observerTarget = useRef(null);
  const { loadingMore } = useInifiteScrolling({
    hasNextPage: data?.conversations?.pageInfo.hasNextPage,
    endCursor: data?.conversations?.pageInfo.endCursor,
    fetchMore,
    observerTarget,
  });

  useEffect(() => {
    const node = first(data?.conversations?.edges)?.node as ConversationType;
    if (node) {
      setActiveConversation(node);
    }
  }, [data]);

  useEffect(() => {
    if (!currentUser && !userLoading && navigate) {
      navigate("/login");
    }
  }, [currentUser, navigate, userLoading]);

  if (loading || userLoading) {
    return (
      <CircularProgress
        top="50%"
        position="fixed"
        left="50%"
        isIndeterminate
        color="green.300"
      />
    );
  }
  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>;
  }
  if (!currentUser) {
    return <></>;
  }
  return (
    <Grid
      templateAreas={`
      "nav header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={"50px 1fr"}
      gridTemplateColumns={"300px 1fr"}
      h="100%"
      gap="0"
      color="blackAlpha.700"
    >
      <GridItem pl="0" area={"nav"} overflow="scroll">
        <Flex pl={4} flexDir="column">
          <UserAvatar user={currentUser} />
        </Flex>
        {map(
          ({ node }: { node: ConversationType }) => (
            <Conversation
              onClick={() => setActiveConversation(node)}
              selected={activeConversation?.id === node.id}
              key={`con-${node?.id}`}
              node={node}
            />
          ),
          data?.conversations?.edges,
        )}
        {loadingMore && <CircularProgress isIndeterminate color="green.300" />}
        <Box ref={observerTarget} />
      </GridItem>
      <GridItem pl="2" bg="gray.100" area={"header"}>
        {activeConversation && (
          <ConversationHeader conversation={activeConversation} />
        )}
      </GridItem>
      <GridItem
        pl="0"
        area="main"
        position="relative"
        bg="#fdf6e7"
        alignItems="flex-start"
        overflow="auto"
        height="100%"
        flexDirection="column-reverse"
        display="flex"
      >
        {activeConversation && (
          <Messages conversationId={activeConversation.id} />
        )}
      </GridItem>
      <GridItem pl="0" area={"footer"}>
        {activeConversation && (
          <NewMessage conversationId={activeConversation.id} />
        )}
      </GridItem>
    </Grid>
  );
};

export default Home;
