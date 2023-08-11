import React, { useEffect, useState } from "react";
import {
  ConversationFieldsFragment,
  MessageFieldsFragment,
  UserFieldsFragment,
} from "../../__gql__/graphql";
import { Box, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import { decryptText } from "../../Shared/utils/pgp-util";
import { truncate } from "lodash/fp";

const bodyTruncate = truncate({ length: 30, omission: "..." });
type ConversationProps = {
  node?: ConversationFieldsFragment & { user: UserFieldsFragment } & {
    message: MessageFieldsFragment;
  };
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
const Conversation: React.FC<ConversationProps> = ({
  node,
  selected,
  onClick,
}) => {
  const [message, setMessage] = useState<MessageFieldsFragment>();
  useEffect(() => {
    (async () => {
      if (node?.message?.body) {
        const body = await decryptText(node?.message?.body);
        if (body) {
          setMessage({
            ...node.message,
            body: bodyTruncate(body),
          });
        }
      }
    })();
  }, [node]);

  return (
    <Flex
      onClick={onClick}
      _hover={{ bg: "Highlight", cursor: "pointer" }}
      bg={selected ? "Highlight" : undefined}
      flexDirection="row"
      key={node?.id}
      padding={3}
      borderBottom="1px solid"
      borderBottomColor="listBorder.light"
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
        <Box>{message?.body}</Box>
      </Box>
      <Box fontSize={11} alignSelf="top" marginLeft="auto">
        {dayjs(node?.message?.createdAt).format("HH:mm A")}
      </Box>
    </Flex>
  );
};

export default Conversation;
