import { Box, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { leftNavVar } from "../../Shared/reactive-vars";
import { useReactiveVar } from "@apollo/client";

const BackBtn: React.FC = () => {
  const leftNav = useReactiveVar(leftNavVar);
  return (
    <Flex alignItems="center" backgroundColor="seagreen" color="white">
      <IconButton
        color="white"
        background="none"
        onClick={() => {
          leftNavVar("conversations");
        }}
        icon={<ArrowBackIcon />}
        aria-label="back"
      />
      <Box textTransform="capitalize">{leftNav}</Box>
    </Flex>
  );
};

export default BackBtn;
