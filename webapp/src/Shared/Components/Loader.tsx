import { CircularProgress } from "@chakra-ui/react";
import React from "react";

const Loader: React.FC = () => (
  <CircularProgress
    top="50%"
    position="fixed"
    left="50%"
    isIndeterminate
    color="green.300"
  />
);

export default Loader;
