/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import loadable from "@loadable/component";
import "./env.ts";
import gqlClient from "./gql-client";
import "./main.css";

const router = createMemoryRouter([
  {
    path: "/",
    Component: loadable(() => import("./Home")),
  },
  {
    path: "/conversations/:id",
    Component: loadable(() => import("./Home")),
  },
  {
    path: "/login",
    Component: loadable(() => import("./Auth/Login")),
  },
  // {
  //   path: "/settings",
  //   children: [
  //     {
  //       path: "profile",
  //       Component: loadable(() => import("./Settings/Profile")),
  //     },
  //     {
  //       path: "keys",
  //       Component: loadable(() => import("./Settings/Keys")),
  //     }
  //   ],
  // },
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
