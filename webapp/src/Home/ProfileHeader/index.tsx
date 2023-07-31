import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import UserAvatar from "../../Shared/Components/UserAvatar";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../Auth/hooks/useCurrentUser";

const ProfileHeader: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  return (
    <Flex pl={4} flexDir="row" alignItems="center">
      <UserAvatar user={currentUser} />
      <Box ml="auto">
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
            <MenuItem onClick={() => navigate("/settings/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => navigate("/settings/keys")}>Keys</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default ProfileHeader;
