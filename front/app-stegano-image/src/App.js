import React from 'react';
import Router from './components/AppRoutes/Router'
import AuthContextProvider from './contexts/AuthContext.js';
import { RouterProvider } from 'react-router-dom';

function App() {

  return (
    <div>
      <AuthContextProvider>
        <RouterProvider router={Router} fallbackElement={<p>Initial Load...</p>} />
      </AuthContextProvider>
    </div>
  );
}

export default App;
