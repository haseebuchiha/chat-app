import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import LOGIN from "./login.graphql";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import CURRENT_USER from "../current-user.graphql";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, { loading, client }] = useMutation(LOGIN, {
    onCompleted(res) {
      client.writeQuery({
        query: CURRENT_USER,
        data: {
          currentUser: res.login?.user,
        },
      });
      navigate("/");
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (variables) => login({ variables }),
  });
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
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
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              onChange={formik.handleChange}
              isChecked={formik.values.rememberMe}
              colorScheme="purple"
            >
              Remember me?
            </Checkbox>
            <Button
              disabled={formik.isSubmitting || loading}
              isLoading={formik.isSubmitting || loading}
              type="submit"
              colorScheme="purple"
              width="full"
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
