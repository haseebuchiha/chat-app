import { makeVar } from "@apollo/client";

export const leftNavVar = makeVar<"profile" | "conversations" | "users">(
  "conversations",
);
