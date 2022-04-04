import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="join" element={<JoinRoom />} />
          <Route path="create" element={<CreateRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
