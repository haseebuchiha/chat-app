import { useMutation } from "@apollo/client";
import { Box, Flex, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import SEND_MESSAGE from "./send-message.graphql";
import { Icon } from "@chakra-ui/react";
import { AiOutlineSend } from "react-icons/ai";
import { isEmpty, template, trim } from "lodash/fp";
import { useParams } from "react-router-dom";
import MESSAGE_FIELD_FRAGMENT from "../../Shared/gql/message-fields.graphql";
import { MessageFieldsFragment } from "../../__gql__/graphql";

interface FormValues {
  body?: string;
}
const fieldNameTemplate = template('conversationMessages:{"conversationId":"<%= id %>"}')

type MessageRes = { __typename?: "Message" | undefined; } & { " $fragmentRefs"?: { MessageFieldsFragment: MessageFieldsFragment; } | undefined; }

const NewMessage: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { id } = useParams();

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
      if (id) {
        sendMessage({
          variables: {
            conversationId: id,
            body: values.body,
          },
          optimisticResponse: {
            sendMessage: {
              __typename: "Message",
              body: formik.values.body,
              id: "optimistic",
              createdAt: new Date().toISOString(),
              isAuthor: true,
              status: 'SENT',
            } as MessageRes,
          }
        });
      }
    },
  });
  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    update(cache, { data }) {
        cache.modify({
          fields: {
            conversationMessages(existingMessages = {}, {storeFieldName}) {
              if (fieldNameTemplate({id}) !== storeFieldName) {
                return existingMessages;
              }
              const message = data?.sendMessage as MessageFieldsFragment;
              const newMessageRef = cache.writeFragment({
                data: message,
                fragment: MESSAGE_FIELD_FRAGMENT,
              });
              return {
                  ...existingMessages,
                  edges: [
                    {
                      __typename: 'MessageEdge',
                      node: newMessageRef,
                    },
                    ...(existingMessages?.edges || [])
                  ]
                };
            },
          },
        });
    },
    onCompleted() {
      formik.setValues({ body: "" });
      inputRef.current?.focus();
    }
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
};

export default NewMessage;
