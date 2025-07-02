interface ImportMetaEnv {
  readonly VITE_LLM_CONNECTOR_HOST: string;
  readonly VITE_LLM_CONNECTOR_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
