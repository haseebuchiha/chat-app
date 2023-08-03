import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { MessageFieldsFragment } from "../../__gql__/graphql";
import dayjs from "dayjs";
import Delivered from "./Delivered";

interface MessageProps {
  node: MessageFieldsFragment;
  author?: boolean;
}
const Message: React.FC<MessageProps> = ({ node, author }) => (
  <Flex
    padding={2}
    minWidth={100}
    bg={author ? "#d9fdd3" : "white"}
    border="1px solid white"
    borderRadius={15}
    ml={author ? "auto" : 2}
    mr={author ? 2 : "auto"}
    flexDir="row"
  >
    <Box>{node?.body}</Box>
    <Box
      alignSelf="flex-end"
      ml="3"
      fontSize="xx-small"
      textAlign="right"
      display="flex"
    >
      {dayjs(node?.createdAt).format("HH:mm A")}
      <Box ml="1" color="#8696a0">
        {node.status === "sent" && <>&#10003;</>}
        {node.status === "delivered" && <Delivered color="#8696a0" />}
        {node.status === "read" && <Delivered color="#53bdeb" />}
      </Box>
    </Box>
  </Flex>
);

export default Message;
