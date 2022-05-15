# Skyfall Backend

We use `MongoDB` & `Socket.io` & `Express` & `Node` for our backend. 

## Running the Backend
### 1. To start:
Follow this instruction to run it with frontend. 

*Note: `PORT` in `.env` is set to `3001` because the frontend is currently set to run at port `3000` and its proxy is set to port `3001`*.

**Step 1:** Set up `.env` file in `backend` root:
```
MONGODB="<Your Mongo DB url>"
PORT=3001
```
**Step 2:** `npm i` && `npm start`

### 2. To debug:
Run these commands instead of `npm start`
#### Hot reload
Run `npm run dev`. Whenever you make changes to `src` files, the server will re-transpile and reload.
#### Socket debug mode AND Hot reload
Run `npm run dev:debug` to see socket messages that server recieves. This comes on top of hot reload.

### 3. To Test:
Simply run `npm run test` to execute all of the test cases.

We use `supertest` for creating spy on server application (this runs both socket and REST API endpoints) and `mongo-memory-server` for mocking in-memory mongo database.

Currently, we test the files in the following folders:
- `services`: Unit test that only depends on the memory database. Tests correctness of service methods that wrap database-level operations.
- `routes`: Integration test that runs both server and database. Tests correctness of REST API.
- `handlers`: Integration test that runs both server and database. Tests correctness of socket.io event handlers.

### 4. To run lint:
Run `npm run lint` to make sure your code follows the style guide. We currently have AirBnB base lint styling, with some modifications.

## Contributing to the Backend
When creating any addition to the repository, aim to create a test case that tests the functionality where possible. This way, whenever a change is made, any bug will be noticed by the CI pipeline (set up through github actions).

Before making a pull request, check that `npm run test` and `npm run lint` runs without failure or warning. Then, create a PR (which confirms that backend builds successfully and tests/lint checks pass). We require at least one other contributor to approve the PR before merging the PR into the `main` branch.

## Backend Structure
Our backend structure is as follows (as of 14 May):
```
src
  controllers: REST endpoints
    __test__: tests for each controller file
    game.controller.ts
    players.controller.ts
    word-list.controller.ts

  handlers: Socket io event handlers & tests
    __test__: tests for each handler file
    game.handler.ts
    room.handler.ts
    word.handler.ts
    index.ts: bundles handlers from *.handler.ts files

  models: Database models
    player.model.ts
    word-list.model.ts

  services: Methods that interacts with database & tests
    __test__: tests for each service file
    player.service.ts
    word-list.service.ts

  types: Socket message/data types
    index.ts: defines socket-related types

  utils: Testing/logging utils & constants
    logger.ts
    constants.ts
    memory-database.ts: provides methods to start/end/reset db mock

  index.ts: entry point for the application (runs both database & server) and configures express server & socket event handlers
  server.ts: used by index.ts to instantiate express server
  state.ts: globally used object to track in-progress game states
```

