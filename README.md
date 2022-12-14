<h1 align="center">
  <br>
  <img src="./resources/skyfall_logo.svg" alt="skyfall" width="400">
</h1>

<h4 align="center">The best typing game you will ever play</h4>

<p align="center">
  <a href="https://github.com/simoncheng987/skyfall/actions/workflows/deploy.yml">
  <img src="https://github.com/simoncheng987/skyfall/actions/workflows/deploy.yml/badge.svg" alt="build"></a>
    <a href="https://github.com/simoncheng987/skyfall/actions/workflows/backend-ci.yml">
  <img src="https://github.com/simoncheng987/skyfall/actions/workflows/backend-ci.yml/badge.svg" alt="build"></a>
      <a href="https://github.com/simoncheng987/skyfall/actions/workflows/react-ci.yml">
  <img src="https://github.com/simoncheng987/skyfall/actions/workflows/react-ci.yml/badge.svg" alt="build"></a>

</p>

<p align="center">
  <a href="#key-features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="http://skyfall-game.herokuapp.com/">Demo</a>
</p>

## Acknowledgement
> This is a migrated university group project. It is developed among the following listed developers
- [hajineats](https://github.com/hajineats)
- [oscarli00](https://github.com/oscarli00)
- [shreytailor](https://github.com/shreytailor)
- [JoshXLim](https://github.com/JoshXLim)
- [simoncheng987](https://github.com/simoncheng987)

## Key Features

- Hosting and joining a lobby
- Real time competitive typing game
- Game word list and life configuration
- Word list customisation
- Leaderboard

## Installation

To clone and run this application:

```shell
# Clone this repository
$ git clone https://github.com/simoncheng987/skyfall

# Go into the repository
$ cd skyfall
```

After this has been cloned, please follow the instruction in [Frontend README](./frontend/README.md)
and [Backend README](./backend/README.md) to start running the application.

## Deploying to Heroku

To deploy the application from `main` to `skyfall-game.herokuapp.com`, you should merge the up-to-date main branch into `production` branch. `deploy.yml` automatically deploys `production` branch to `skyfall-game.herokuapp.com`.

## Contributing to the repository

Refer to READMEs in `backend` and `frontend` folder to see the development flow.

Generally, you should run tests and lint before making a PR. You should write clean code and write test cases that covers new features and runs reasonably quickly. `react-ci.yml` and `backend-ci.yml` will automatically run when you create a PR that points to `main` branch. 

## Screenshots

<img src="./resources/home.JPG"> 
<img src="./resources/create_room.JPG">
<img src="./resources/lobby.JPG">
<img src="./resources/game.JPG">
<img src="./resources/scoreboard.JPG">
<img src="./resources/leaderboard.JPG">
<img src="./resources/wordlist.JPG">
