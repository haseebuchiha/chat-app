import { useQuery } from "@apollo/client";
import CURRENT_USER from "../current-user.graphql";
import { UserFieldsFragment } from "../../__gql__/graphql";

const useCurrentUser = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  const currentUser = data?.currentUser as UserFieldsFragment & {
    email: string;
  };
  return { currentUser, loading, error };
};

export default useCurrentUser;
