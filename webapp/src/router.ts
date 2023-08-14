import { createMemoryRouter } from "react-router-dom";
import loadable from "@loadable/component";

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
  {
    path: "/sign-up",
    Component: loadable(() => import("./Auth/SignUp")),
  },
  {
    path: "/settings",
    children: [
      {
        path: "profile",
        Component: loadable(() => import("./Settings/Profile")),
      },
    ],
  },
]);

export default router;
