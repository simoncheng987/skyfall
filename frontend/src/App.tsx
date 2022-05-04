import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom';
import Lobby from './pages/Lobby';
import ClientContextProvider from './context/ClientProvider';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />

          <Route
            path="join"
            element={
              <ClientContextProvider>
                <JoinRoom />
              </ClientContextProvider>
            }
          />
          <Route
            path="create"
            element={
              <ClientContextProvider>
                <CreateRoom />
              </ClientContextProvider>
            }
          />
          <Route
            path="lobby"
            element={
              <ClientContextProvider>
                <Lobby />
              </ClientContextProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
