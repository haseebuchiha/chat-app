import React from "react";
import { leftNavVar } from "../../Shared/reactive-vars";
import { useReactiveVar } from "@apollo/client";
import ConversationNav from "./ConversationNav";
import BackBtn from "./BackBtn";

const ProfileHeader: React.FC = () => {
  const leftNav = useReactiveVar(leftNavVar);
  return <>{leftNav === "conversations" ? <ConversationNav /> : <BackBtn />}</>;
};

export default ProfileHeader;
