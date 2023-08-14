import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import UserAvatar from "../../Shared/Components/UserAvatar";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useCurrentUser from "../../Auth/hooks/useCurrentUser";
import { leftNavVar } from "../../Shared/reactive-vars";
import WriteIcon from "./WriteIcon";
import { useMutation } from "@apollo/client";
import LOGOUT_MUTATION from "./logout.graphql";
import { deleteKey, getKey } from "../../Shared/utils/pgp-util";

const ConversationNav: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted() {
      deleteKey()
      window.location.reload();
    },
  });
  return (
    <Flex pl={4} flexDir="row" alignItems="center">
      <UserAvatar user={currentUser} />
      <Box ml="auto">
        <IconButton
          onClick={() => {
            leftNavVar("users");
          }}
          aria-label="New conversation"
          backgroundColor="transparent"
        >
          <WriteIcon width="23" height="23" />
        </IconButton>
        <Menu>
          <MenuButton
            borderRadius="50%"
            mr={2}
            p={3}
            width="40px"
            height="40px"
            _hover={{ bg: "gray.200" }}
            _expanded={{ bg: "gray.300" }}
            _focus={{ boxShadow: "outline" }}
          >
            <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => leftNavVar("profile")}>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                logout({ variables: {key: getKey()?.publicKey || ''} });
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default ConversationNav;
