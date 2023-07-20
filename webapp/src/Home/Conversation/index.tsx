import React from "react";
import {
  ConversationFieldsFragment,
  UserFieldsFragment,
} from "../../__gql__/graphql";
import { Box, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
type ConversationProps = {
  node?: ConversationFieldsFragment & { user: UserFieldsFragment };
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
const Conversation: React.FC<ConversationProps> = ({
  node,
  selected,
  onClick,
}) => (
  <Flex
    onClick={onClick}
    _hover={{ bg: "Highlight", cursor: "pointer" }}
    bg={selected ? "Highlight" : undefined}
    flexDirection="row"
    key={node?.id}
    padding={3}
    borderBottom="1px solid #ccc"
  >
    <Box
      width="50px"
      height="50px"
      alignItems="center"
      textAlign="center"
      verticalAlign="center"
      borderRadius="50%"
      bg="GrayText"
      color="white"
      lineHeight="50px"
      overflow="hidden"
    >
      {node?.user.avatar ? (
        <img src={node?.user.avatar} alt={node?.user.name || "img"} />
      ) : (
        <>{node?.user.initials}</>
      )}
    </Box>
    <Box flexDir="row" marginLeft={3}>
      <Box>{node?.user.name}</Box>
      <Box>{node?.message?.body}</Box>
    </Box>
    <Box fontSize={11} alignSelf="top" marginLeft="auto">
      {dayjs(node?.message?.createdAt).format("HH:mm A")}
    </Box>
  </Flex>
);

export default Conversation;
