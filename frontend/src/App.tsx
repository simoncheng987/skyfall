import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />

          <Route path="join" element={<p>Join Room</p>} />
          {/* Replace the `<p>Join</p>` with join page */}

          <Route path="create" element={<p>Create Room</p>} />
          {/* Replace the `<p>Join</p>` with join page */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
