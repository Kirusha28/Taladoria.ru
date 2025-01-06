import React from 'react';
import './App.css';
import { routerDeleverItems } from './routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className="App" >
      <RouterProvider router={routerDeleverItems} />
    </div>
  );
}

export default App;
