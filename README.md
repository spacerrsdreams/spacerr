# [Spacerr](https://nextjs.org/) Starter Pack

This starter pack provides a comprehensive Next.js setup, built on top of `create-next-app`, and includes additional features such as:

### Database - ORM

- **[Prisma](https://www.prisma.io/docs/getting-started/quickstart)**

### Global state management and data fetching

- **[TanStack Query](https://tanstack.com/)**: For powerful data fetching and async state management.
- **[Zustand](https://zustand-demo.pmnd.rs/)**: For global state management.

### Type safety and runtime validation

- **[Zod](https://zod.dev/)**

### UI Components and Styling

- **[Shadcn](https://ui.shadcn.com/)**: A collection of copy paste components for beautiful UI.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.

### Code Styling

- **[ESLint](https://eslint.org/)**: Basic ESLint setup for code quality.
- **[Prettier](https://prettier.io/)**: Code formatting for consistency.
- **[VS Code workspace](https://code.visualstudio.com/docs/editor/workspaces)**: This workspace is equipped with essential extensions to enhance code quality. Please ensure you install the recommended extensions and work within the workspace.

## How to run the project

1. **Install Node.js** version `^20.16.0` or later: [Node.js](https://nodejs.org/en/download/)
2. **Install pnpm** version `^9.0.0` or later: `npm install -g pnpm@9.6.0`
3. **Install project dependencies** - `pnpm install`
4. **Create a `.env` file** in the root of the project and add the environment variables which is provided in `.env.example` file.
5. **Generate prisma client** - `npx prisma generate`
6. **Sync database** - `npx prisma db push`
7. **Run the application** - `pnpm dev`

## Available commands

1. **`pnpm dev`**: Runs the application in development mode.
2. **`pnpm build`**: Builds the application for production.
3. **`pnpm start`**: Starts the application in production mode.
4. **`pnpm lint`**: Lints the application using ESLint.
5. **`pnpm postinstall`**: Runs the postinstall script to generate Prisma client.
6. **`pnpm prepare`**: Runs the prepare script to set up Husky for Git hooks.

## Additional Information

Once the application is running, you can start developing with a powerful setup already configured. For more details on customizing your environment or extending the starter pack, refer to the documentation of each included tool.

Happy Coding!
