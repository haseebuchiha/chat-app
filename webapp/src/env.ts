import { includes, isEmpty } from "lodash/fp";

const includesReactEnv = includes("VITE_");

if (isEmpty(window._env_)) {
  window._env_ ||= {};
  for (const env in import.meta.env) {
    const reactEnv = env.replace("VITE_", "");
    if (!window._env_[reactEnv] && includesReactEnv(env)) {
      window._env_[reactEnv] = import.meta.env[env];
    }
  }
}
