/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import loadable from "@loadable/component";
import "./env.ts";
import gqlClient from "./gql-client";
import "./main.css";

const Home = loadable(() => import("./Home"));
const Login = loadable(() => import("./Auth/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={gqlClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
