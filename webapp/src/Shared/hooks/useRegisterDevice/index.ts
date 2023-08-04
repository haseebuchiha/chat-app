import { useEffect, useState } from "react";
import useCurrentUser from "../../../Auth/hooks/useCurrentUser";
import { generateKey, getKey, savePrivateKey } from "../../utils/pgp-util";
import { useMutation } from "@apollo/client";
import REGISTER_DEVICE from "./register-device.graphql";

const useRegisterDevice = () => {
  const { currentUser } = useCurrentUser();
  const key = getKey();
  const [registerDevice] = useMutation(REGISTER_DEVICE, {
    onCompleted() {
      setRegistered(true);
    },
  });
  const [registered, setRegistered] = useState(false);
  useEffect(() => {
    if (currentUser && registerDevice) {
      if (!key) {
        generateKey(currentUser).then((key) => {
          savePrivateKey(key);
          registerDevice({
            variables: { key: key.publicKey, name: navigator.userAgent },
          });
        });
      } else {
        setRegistered(true);
      }
    }
  }, [currentUser, registerDevice, key]);
  return { registered };
};

export default useRegisterDevice;
