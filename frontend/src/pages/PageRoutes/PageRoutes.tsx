import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home';
import JoinRoom from '../JoinRoom';
import CreateRoom from '../CreateRoom';
import Lobby from '../Lobby';
import GameContextProvider from '../../context/GameContextProvider';
import GameView from '../GameView';
import Scoreboard from '../Scoreboard';

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="join" element={<JoinRoom />} />
        <Route path="create" element={<CreateRoom />} />
        <Route path="lobby" element={<Lobby />} />
        <Route
          path="game"
          element={
            <GameContextProvider>
              <GameView />
            </GameContextProvider>
          }
        />

        <Route
          path="score"
          element={
            <GameContextProvider>
              <Scoreboard />
            </GameContextProvider>
          }
        />
      </Route>
    </Routes>
  );
}
