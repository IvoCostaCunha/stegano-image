import React from 'react';
import Router from './components/Router.js';
import AuthContextProvider from './contexts/AuthContext.js';
import DataContextProvider from './contexts/DataContext';
import AppContextProvider from './contexts/AppContext.js';

import { RouterProvider } from 'react-router-dom';

function App() {

  return (
      <AppContextProvider>
        <AuthContextProvider>
          <DataContextProvider>
            <RouterProvider router={Router} fallbackElement={<p>Initial Load...</p>} />
          </DataContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
  );
}

export default App;