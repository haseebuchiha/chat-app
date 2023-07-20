import React from "react";
import {
  ConversationFieldsFragment,
  MessageFieldsFragment,
  UserFieldsFragment,
} from "../../__gql__/graphql";
import { Box, Flex } from "@chakra-ui/react";
import UserAvatar from "../../Shared/Components/UserAvatar";

interface ConversationHeaderProps {
  conversation: ConversationFieldsFragment & {
    user: UserFieldsFragment;
    message: MessageFieldsFragment;
  };
}
const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
}) => (
  <Flex alignItems="center">
    <UserAvatar user={conversation.user} />
    <Box ml={2}>{conversation.user.name}</Box>
  </Flex>
);

export default ConversationHeader;
