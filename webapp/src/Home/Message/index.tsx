import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { MessageFieldsFragment } from "../../__gql__/graphql";
import dayjs from "dayjs";

interface MessageProps {
  node: MessageFieldsFragment;
  author?: boolean;
}
const Message: React.FC<MessageProps> = ({ node, author }) => (
  <Flex
    padding={2}
    minWidth={100}
    bg={author ? "whatsapp.100" : "white"}
    border="1px solid white"
    borderRadius={15}
    ml={author ? "auto" : 2}
    mr={author ? 2 : "auto"}
    flexDir="column"
  >
    <Box>{node?.body}</Box>
    <Box fontSize="xx-small" textAlign="right">
      {dayjs(node?.createdAt).format("HH:mm A")}
    </Box>
  </Flex>
);

export default Message;
