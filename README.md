# Pangea Schedule API

Fastify server that handles requests for Pangea Schedule.

## Major technologies

- [Fastify 3](https://www.fastify.io/)
- [MongoDB native driver 4](https://github.com/mongodb/node-mongodb-native)
- [date-fns 2](https://date-fns.org/) (date handling)
- Typescript, ESLint, and Prettier are used to improve the developer experience

## Requires

- [Node.js >= 16.x](https://nodejs.org/en/)
- [NPM >= 8.x](https://github.com/npm/cli)

## Recommended tools

- [Visual Studio Code](https://code.visualstudio.com/)
  - [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (formatting)
  - [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (error checking)
- [NVM](https://github.com/nvm-sh/nvm) (helps to manage multiple node.js versions on your machine)

## Scripts

#### `build`

Compiles javascript and typescript code into compatible javascript and exports to the `build` directory.

#### `start`

Runs a node server using compiled code in the `build` directory.

#### `dev`

Convenience function that runs `build` and `dev`.

#### `format`

Formats the project using prettier.

#### `type-check`

Use TypeScript to lint the codebase to find type-related errors (will not emit any javascript).
