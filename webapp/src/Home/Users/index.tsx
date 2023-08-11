import { Box, Flex, Input } from "@chakra-ui/react";
import React, { Fragment } from "react";
import GET_USERS from "./users.graphql";
import { useMutation, useQuery } from "@apollo/client";
import Loader from "../../Shared/Components/Loader";
import { User } from "../../__gql__/graphql";
import { groupBy, keys, map } from "lodash/fp";
import UserAvatar from "../../Shared/Components/UserAvatar";
import START_CONVERSATION_MUTATION from "./start-conversation.graphql";
import { useNavigate } from "react-router-dom";
import { leftNavVar } from "../../Shared/reactive-vars";

const groupByFirstLetter = groupBy(
  ({ node }: { node: User }) => node?.name?.[0],
);

const Users: React.FC = () => {
  const {
    data: queryData,
    loading,
    fetchMore,
  } = useQuery(GET_USERS, {
    onCompleted(d) {
      setData(d);
    },
  });
  const navigate = useNavigate();
  const [data, setData] = React.useState(queryData);
  const [startConversation] = useMutation(START_CONVERSATION_MUTATION, {
    onCompleted(res) {
      navigate(`/conversations/${res.startConversation.id}`);
      leftNavVar("conversations");
    },
  });
  if (loading) {
    return <Loader />;
  }
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetchMore({ variables: { query: e.target.value } }).then((d) =>
      setData(d.data),
    );
  };
  const groups = groupByFirstLetter(data?.users?.edges);
  return (
    <Flex direction="column">
      <Input placeholder="Search contacts" onChange={onSearch} />
      {map(
        (alphabet: string) => (
          <Fragment key={`alphabet-${alphabet}`}>
            <Box fontWeight="bold" fontSize="lg" mt="2">
              {alphabet}
            </Box>
            {map(
              ({ node: user }: { node: User }) => (
                <Flex
                  borderBottom="1px solid"
                  borderBottomColor="listBorder.light"
                  key={`user-${user.id}`}
                  _hover={{ bg: "Highlight", cursor: "pointer" }}
                  onClick={() => {
                    startConversation({ variables: { userId: user.id } });
                  }}
                >
                  <Box>
                    <UserAvatar user={user} />
                  </Box>
                  <Box alignSelf="center" ml="2">
                    {user.name}
                  </Box>
                </Flex>
              ),
              groups?.[alphabet],
            )}
          </Fragment>
        ),
        keys(groups),
      )}
    </Flex>
  );
};

export default Users;
