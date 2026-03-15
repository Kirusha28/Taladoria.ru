import React from 'react';
import './App.css';
import './Animations.css'
import { routerDeleverItems } from './routes';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './components/Wrappers/AppWrapper/AppWrapper';

function App() {
  return (
    <div className="App" >
      <AuthProvider>
        <RouterProvider router={routerDeleverItems} />
      </AuthProvider>
    </div>
  );
}

export default App;
