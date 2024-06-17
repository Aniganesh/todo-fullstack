# todo-fullstack

This monorepo contains both the frontend and back-end code for the Todo app.
It also includes a folder called "dtos" that contains the shared dtos for both frontend and backend.

The backend requires Postgres and pgadmin to be installed. If you don't have either, use the docker command to run the back-end.

To run the app locally:

- Configuring environment variables:
  - Create a .env file at the root of the project with all the env vars specified in .env.dev.docker.example.
  - Create a .env file in /backend with all the env vars specified in .env.example within the this folder. **Note**: Variables starting with DB need to have the same value in .env at the root of the project and the .env within the backend folder.  **Note 2**: .env in backend is needed even if you're using the Docker version.
  - Create a .env file in /frontend with all the env vars specified in .env.example within the frontend folder. Backend url will likely be `http://localhost:3000`.
- Running the project:
  - Open 2 terminals at the root of the project.
  - Run `pnpm install` to install all the dependencies for both frontend and backend.
  - Run `pnpm --filter todo-frontend run dev` in one terminal to start the frontend
  - Run `pnpm --filter todo-backend run start:dev` or `docker compose -f docker-compose.dev.yaml up --build` in the other to start the back-end.
  - **If you don't have pnpm, get it from [here](https://pnpm.io/installation) or use the equivalent npm commands given below:**
  - After open both terminals at the root of the project, 
  - Run `cd frontend && npm install && npm run dev` to install frontend dependencies and start the frontend.
  - Run `cd backend && npm install && npm run start:dev` to install backend dependencies and start the backend. To run the docker version, use the same command as above
If the back-end fails to start, you may need to create the "todoapp" database by logging into the pgadmin dashboard.

To run the test suites, run `pnpm --filter todo-backend run test`.

To run in a production environment, use the .env.prod.docker.example as your reference and run the docker-compose.prod.yaml instead of docker-compose.dev.yaml
If you have postgres running locally on your device, you will need to stop the service in order for the backend to start.
