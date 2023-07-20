import { useMutation } from "@apollo/client";
import { Box, Flex, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import SEND_MESSAGE from "./send-message.graphql";
import { Icon } from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import { isEmpty, trim } from "lodash/fp";

interface NewMessageProps {
  conversationId: string;
}

interface FormValues {
  body?: string;
}

const NewMessage: React.FC<NewMessageProps> = React.memo(
  ({ conversationId }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
      onCompleted() {
        formik.setValues({ body: "" });
        inputRef.current?.focus();
      },
    });
    const formik = useFormik({
      initialValues: {
        body: "",
      },
      validate: (values) => {
        const errors: FormValues = {};
        if (isEmpty(trim(values.body))) {
          errors.body = "Required";
        }
        return errors;
      },
      onSubmit: (values) => {
        sendMessage({
          variables: {
            conversationId,
            body: values.body,
          },
        });
      },
    });
    const disabled = !formik.isValid || loading || !formik.touched;

    return (
      <Box bg="gray.200" padding={2}>
        <form onSubmit={formik.handleSubmit}>
          <Flex flexDir="row">
            <Input
              borderRadius={8}
              bg="white"
              type="text"
              id="body"
              name="body"
              onChange={formik.handleChange}
              value={formik.values.body}
              placeholder="Type a message"
              ref={inputRef}
              autoFocus
            />
            <Icon
              alignSelf="center"
              cursor="pointer"
              marginLeft={2}
              as={AiOutlineSend}
              color={disabled ? "grey" : "green.500"}
            />
          </Flex>
        </form>
      </Box>
    );
  },
  (prevProps, nextProps) =>
    prevProps.conversationId === nextProps.conversationId,
);

export default NewMessage;
