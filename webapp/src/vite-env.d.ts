/// <reference types="vite/client" />
export interface EnvWindow extends Window {
  _env_: Record<string, string | undefined>;
}

declare global {
  interface Window {
    _env_: Record<string, string | undefined>;
  }
}

declare let window: EnvWindow;
