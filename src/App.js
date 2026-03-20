import React from 'react';
import './App.css';
import './Animations.css'
import { routerDeleverItems } from './routes';
import { RouterProvider } from 'react-router-dom';
import AppWrapper from './components/Wrappers/AppWrapper/AppWrapper';
import AuthProvider from './components/Auth/AuthProvider';

function App() {
  return (
    <div className="App" >
      <AppWrapper>
        <AuthProvider>
          <RouterProvider router={routerDeleverItems} />
        </AuthProvider>
      </AppWrapper>
    </div>
  );
}

export default App;
