import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8000/graphql",
  documents: ["src/**/*.graphql.ts"],
  generates: {
    "./src/__gql__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;

// import { type CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
//   documents: ['src/**/*.ts'],
//   generates: {
//     './src/gql/': {
//       preset: 'client',
//     },
//   },
//   hooks: { afterAllFileWrite: ['prettier --write'] },
// };

// export default config;
