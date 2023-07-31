import { useLazyQuery } from "@apollo/client";
import CURRENT_USER from "../current-user.graphql";
import { User } from "../../__gql__/graphql";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [fetch, { error, client }] = useLazyQuery(CURRENT_USER, {
    onCompleted(data) {
      setCurrentUser(data.currentUser as User);
      setLoading(false);
    },
  });
  const [currentUser, setCurrentUser] = useState<User>(
    client.readQuery({ query: CURRENT_USER })?.currentUser as User,
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!currentUser && fetch) {
      fetch();
    } else {
      setLoading(false);
    }
  }, [currentUser, fetch]);
  return { currentUser, loading, error };
};

export default useCurrentUser;
