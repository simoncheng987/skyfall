# Frontend Guide
<h1 align="center">
  <br>
  <img src="../resources/skyfall_logo.svg" alt="skyfall" width="400">
</h1>

<h2 align="center"> Welcome to the frontend code base! </h2>

> Warning: If you have changed or decided to use a different `PORT` value in the `/backend/.env`
> file that was suggested in the [Backend README](../backend/README.md). You will need to change the `proxy` value
> to the corresponding port number in the `/frontend/package.json` file

## How to start?

### Starting the application

To start running the frontend application of this project, you will need to first install all the npm packages
dependencies inside the `/frontend` directory by running

`npm install`

After the installation of dependencies, you can run the app in the development mode via

`npm start`

And open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make
edits. You will also see any lint errors in the console.

### Testing the application

To run the test suite, you can use the

`npm test`

to launch the test runner in the interactive watch mode. See the section
about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Building the applicaiton

To build the application, by running

`npm run build`

will builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified
and the filenames include the hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Structure

The frontend project are consists of 5 main directories `components`, `context`, `pages`, `types`, and `utils`.

Inside of `components` directory, it contains reusable components that can be use among different pages to help us
reduce code duplication.

Regarding the implementation of the skyfall game, we have separated the retrieval of game data and its display into
different parts. Hence, "dumb" components that have been created only used to display the UI are in `pages` and the
components that interact with backend are placed in the `context` directory.

Lastly, customised interfaces are placed in `types` and utility tool in `utils` helps to further improve code
reusability.

**Notice**: All the `__tests__` directories are omitted in the directory structure tree diagram below. All
the `__tests__`
directories contain tests for the components that are at the same directory level. For
example, `src/pages/createRoom/__tests__` contain all the tests for components inside of `src/pages/createRoom/`.

```
src
│   App.tsx: The main application
│   fonts.css
│   index.css
│   index.tsx
│   react-app-env.d.ts
│   reportWebVitals.ts
│   setupTests.ts
│
├───components: Reusable components
│   ├───AvatarFrame
│   │   │   AvatarFrame.module.css
│   │   │   AvatarFrame.tsx
│   │   │   index.tsx
│   │
│   ├───BackButton
│   │       BackButton.module.css
│   │       BackButton.tsx
│   │       index.tsx
│   │
│   ├───Button
│   │   │   Button.module.css
│   │   │   Button.tsx
│   │   │   index.tsx
│   │
│   ├───Dropdown
│   │   │   Dropdown.module.css
│   │   │   Dropdown.tsx
│   │   │   index.tsx
│   │
│   ├───ErrorToast
│   │   │   ErrorToast.module.css
│   │   │   ErrorToast.tsx
│   │   │   index.tsx
│   │
│   ├───SpinBox
│   │   │   index.tsx
│   │   │   SpinBox.module.css
│   │   │   SpinBox.tsx
│   │   
│   │
│   ├───TextField
│   │   │   index.tsx
│   │   │   TextField.module.css
│   │   │   TextField.tsx
│   │   
│   │
│   └───Title
│       │   index.tsx
│       │   Title.module.css
│       │   Title.tsx
│
├───context: Components that are relevant to context
│       ClientProvider.tsx
│       GameContextProvider.tsx
│
├───pages: Pages of the app
│   ├───CreateRoom
│   │   │   CreateRoom.module.css
│   │   │   CreateRoom.tsx
│   │   │   index.tsx
│   │   
│   ├───GameView
│   │   │   GameView.module.css
│   │   │   GameView.tsx
│   │   │   index.tsx
│   │   │
│   │   ├───CurrentPlayerView
│   │   │   │   CurrentPlayerView.module.css
│   │   │   │   CurrentPlayerView.tsx
│   │   │   │   index.tsx
│   │   │
│   │   ├───GameStatistics
│   │   │       GameStatistics.module.css
│   │   │       GameStatistics.tsx
│   │   │       index.tsx
│   │   │
│   │   ├───Hearts
│   │   │   │   Hearts.module.css
│   │   │   │   Hearts.tsx
│   │   │   │   index.tsx
│   │   │
│   │   ├───OpponentPlayerView
│   │   │   │   index.tsx
│   │   │   │   OpponentPlayerView.module.css
│   │   │   │   OpponentPlayerView.tsx
│   │   │
│   │   ├───WordCanvas
│   │   │   │   generateWordPositionCSSProperties.ts
│   │   │   │   index.tsx
│   │   │   │   WordCanvas.module.css
│   │   │   │   WordCanvas.tsx
│   │   │
│   │   ├───WordCanvasHeader
│   │   │   │   index.tsx
│   │   │   │   WordCanvasHeader.module.css
│   │   │   │   WordCanvasHeader.tsx
│   │   │
│   │   ├───WordCloud
│   │   │   │   index.tsx
│   │   │   │   WordCloud.module.css
│   │   │   │   WordCloud.tsx
│   │   │
│   │   └───WordInput
│   │           index.tsx
│   │           WordInput.module.css
│   │           WordInput.tsx
│   ├───Home
│   │   │   Home.module.css
│   │   │   Home.tsx
│   │   │   index.tsx
│   │
│   ├───JoinRoom
│   │   │   index.tsx
│   │   │   JoinRoom.module.css
│   │   │   JoinRoom.tsx
│   │
│   ├───Leaderboard
│   │   │   index.tsx
│   │   │   Leaderboard.module.css
│   │   │   Leaderboard.tsx
│   │   
│   ├───Lobby
│   │   │   index.tsx
│   │   │   Lobby.module.css
│   │   │   Lobby.tsx
│   │
│   ├───PageRoutes
│   │   │   index.tsx
│   │   │   PageRoutes.tsx
│   │
│   ├───PageScaffold
│   │   │   index.tsx
│   │   │   PageScaffold.module.css
│   │   │   PageScaffold.tsx
│   │
│   ├───Scoreboard
│   │   │   index.tsx
│   │   │   Scoreboard.module.css
│   │   │   Scoreboard.tsx
│   │   │
│   │   └───Card
│   │           Card.module.css
│   │           Card.tsx
│   │           index.tsx
│   │
│   └───UploadWords
│           index.tsx
│           UploadWords.module.css
│           UploadWords.tsx
│
├───types: TypeScript Interface Type
│       GameStatistics.ts
│       LeaderboardEntry.ts
│       TimedWordState.ts
│       WordState.ts
│
└───utils: Utilities
        GameSafetyCheck.tsx
        useWindowSize.tsx
        useWindowSizeMocks.ts
```

## Development Practice

For the frontend code development, we use `React` and `TypeScript`.

### Code Styling

Practice of developing react functional components are considered in this project to achieve following benefits:

1. Ease of reusing code through custom hooks
2. Good readability
3. Better modularity

### Code Specification

In this project, ESLint have been used to analyse problematic patterns found in TypeScript code, and Prettier are used
to fix the problematic patterns that can be solved automatically. For the patterns that can't be automatically resolved
will be resolved manually by developers.

### Continuous Integration

Continuous Integration have been deployed in this project to ensure code reliability. Before merging a pull request, the
GitHub Action CI will be run. This has helped us to eliminate serious feature failure, and further improve on code
specification.
