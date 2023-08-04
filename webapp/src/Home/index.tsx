import { Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ConversationHeader from "./ConversationHeader";
import useCurrentUser from "../Auth/hooks/useCurrentUser";
import { useNavigate, useParams } from "react-router-dom";
import loadable from "@loadable/component";
import ProfileHeader from "./ProfileHeader";
import Conversations from "./Conversations";
import Loader from "../Shared/Components/Loader";
import useRegisterDevice from "../Shared/hooks/useRegisterDevice";

const Messages = loadable(() => import("./Messages"));
const NewMessage = loadable(() => import("./NewMessage"));

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, loading: userLoading } = useCurrentUser();
  const { registered } = useRegisterDevice();

  useEffect(() => {
    if (!currentUser && !userLoading && navigate) {
      navigate("/login");
    }
  }, [currentUser, navigate, userLoading]);

  if (userLoading || !registered) {
    return <Loader />;
  }
  if (!currentUser) {
    return <></>;
  }
  return (
    <Grid
      templateAreas={`
        "nav header"
        "nav main"
        "nav footer"`}
      gridTemplateRows={"50px 1fr"}
      gridTemplateColumns={"450px 1fr"}
      h="100%"
      gap="0"
      color="blackAlpha.700"
    >
      <GridItem pl="0" area={"nav"} overflow="scroll">
        <ProfileHeader />
        <Conversations />
      </GridItem>
      <GridItem pl="2" bg="gray.100" area={"header"}>
        {id && <ConversationHeader />}
      </GridItem>
      <GridItem
        pl="0"
        area="main"
        position="relative"
        bg="#fdf6e7"
        alignItems="flex-start"
        overflow="auto"
        height="100%"
        flexDirection="column-reverse"
        display="flex"
      >
        {id && <Messages />}
      </GridItem>
      <GridItem pl="0" area={"footer"}>
        {id && <NewMessage />}
      </GridItem>
    </Grid>
  );
};

export default Home;
