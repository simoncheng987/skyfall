import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './pages/PageRoutes';
import ClientContextProvider from './context/ClientProvider';

function App() {
  return (
    <BrowserRouter>
      <ClientContextProvider>
        <PageRoutes />
      </ClientContextProvider>
    </BrowserRouter>
  );
}

export default App;
