import { useEffect, useState } from "react";
import useCurrentUser from "../../../Auth/hooks/useCurrentUser";
import { generateKey, getKey, savePrivateKey } from "../../utils/pgp-util";
import { useMutation, useQuery } from "@apollo/client";
import REGISTER_DEVICE_MUTATION from "./register-device.graphql";
import { useToast } from "@chakra-ui/react";
import USER_HAS_KEY_QUERY from "./user-has-key.graphql";

const useRegisterDevice = () => {
  const { currentUser } = useCurrentUser();
  const [key, setKey] = useState(getKey());
  const toast = useToast({
    position: "top",
    isClosable: false,
  });
  const { data, loading } = useQuery(USER_HAS_KEY_QUERY, {
    variables: { key: key?.publicKey || "" },
    skip: !key,
  });
  const [registerDevice, { client }] = useMutation(REGISTER_DEVICE_MUTATION, {
    onCompleted() {
      client.writeQuery({
        query: USER_HAS_KEY_QUERY,
        variables: { key: key?.publicKey || "" },
        data: { userHasKey: true },
      });
      setRegistered(true);
    },
    onError(e) {
      toast({
        title: "Device Registration Error",
        description: e.message,
        status: "error",
      });
      setRegistered(false);
    },
  });
  const [registered, setRegistered] = useState(false);
  useEffect(() => {
    if (currentUser && registerDevice && !loading) {
      if (!key) {
        generateKey(currentUser).then((k) => {
          savePrivateKey(k);
          setKey(k);
          registerDevice({
            variables: { key: k.publicKey, name: navigator.userAgent },
          });
        });
      } else if (!data?.userHasKey) {
        registerDevice({
          variables: { key: key.publicKey, name: navigator.userAgent },
        });
      } else {
        setRegistered(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, registerDevice, loading, data?.userHasKey]);
  return { registered };
};

export default useRegisterDevice;
