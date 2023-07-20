import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

interface ErrorAlertProps {
  title?: string;
  children?: React.ReactNode;
}
const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, children }) => (
  <Alert status="error">
    <AlertIcon />
    {title && <AlertTitle>{title}</AlertTitle>}
    {children && <AlertDescription>{children}</AlertDescription>}
  </Alert>
);
export default ErrorAlert;
