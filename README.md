# todo-fullstack

This monorepo contains both the frontend and back-end code for the Todo app.
It also includes a folder called "dtos" that contains the shared dtos for both frontend and backend.

To run the app locally:

- Open 2 terminals at the root of the project.
- Run `pnpm install` to install all the dependencies for both frontend and backend.
- Run `pnpm --filter todo-frontend run dev` in one terminal and `pnpm --filter todo-backend run start:dev`.

To run the test suites, run `pnpm --filter todo-backend run test`.
