import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import SIGN_UP_MUTATION from "./sign-up.graphql";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast({
    position: "top",
    isClosable: true,
  });
  const [signup, { loading }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted(res) {
      toast({
        title: res.signUp.message,
      });
      navigate("/login");
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      firstname: "",
      lastname: "",
    },
    onSubmit: (variables) => signup({ variables }),
  });
  return (
    <Flex bg="bg.light" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <HStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="firstname">First name</FormLabel>
                <Input
                  id="firstname"
                  autoFocus
                  name="firstname"
                  type="text"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastname">Last name</FormLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>
            <HStack>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="passwordConfirmation">
                  Password Confirmation
                </FormLabel>
                <Input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirmation}
                />
              </FormControl>
            </HStack>
            <Button
              disabled={formik.isSubmitting || loading}
              isLoading={formik.isSubmitting || loading}
              type="submit"
              colorScheme="whatsapp"
              width="full"
            >
              Sign Up
            </Button>
          </VStack>
        </form>
        <Box mt={4}>
          <Link to="/login">Login</Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignUp;
