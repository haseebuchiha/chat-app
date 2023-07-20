import React from "react";
import { User, UserFieldsFragment } from "../../__gql__/graphql";
import { Box } from "@chakra-ui/react";

interface UserAvatarProps {
  user: UserFieldsFragment | User;
}
const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => (
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
    {user.avatar ? (
      <img src={user.avatar} alt={user.name || "img"} />
    ) : (
      <>{user.initials}</>
    )}
  </Box>
);

export default UserAvatar;
