import React from "react";
import { User } from "../../__gql__/graphql";
import { Box, Flex } from "@chakra-ui/react";
import UserAvatar from "../../Shared/Components/UserAvatar";
import GET_CONVERSATION_USER from "./conversation-user.graphql";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

const ConversationHeader: React.FC = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_CONVERSATION_USER, {
    variables: {
      id: id || "",
    },
    skip: !id,
  });
  const user = data?.conversationUser as User;
  return (
    <Flex alignItems="center">
      <UserAvatar user={user} />
      <Box ml={2}>{user?.name}</Box>
    </Flex>
  );
};

export default ConversationHeader;
