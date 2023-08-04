import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MessageFieldsFragment } from "../../__gql__/graphql";
import dayjs from "dayjs";
import Delivered from "./Delivered";
import { decryptText } from "../../Shared/utils/pgp-util";

interface MessageProps {
  node: MessageFieldsFragment;
  author?: boolean;
}
const Message: React.FC<MessageProps> = ({ node, author }) => {
  const [message, setMessage] = useState<MessageFieldsFragment>();
  useEffect(() => {
    if (node) {
      (async () => {
        const body = await decryptText(node.body);
        if (body) {
          setMessage({
            ...node,
            body,
          });
        }
      })();
    }
  }, [node]);
  if (!message?.body) {
    return null;
  }
  return (
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
      <Box>{message?.body}</Box>
      <Box
        alignSelf="flex-end"
        ml="3"
        fontSize="xx-small"
        textAlign="right"
        display="flex"
      >
        {dayjs(message?.createdAt).format("HH:mm A")}
        <Box ml="1" color="#8696a0">
          {message?.status === "sent" && <>&#10003;</>}
          {message?.status === "delivered" && <Delivered color="#8696a0" />}
          {message?.status === "read" && <Delivered color="#53bdeb" />}
        </Box>
      </Box>
    </Flex>
  );
};

export default Message;
