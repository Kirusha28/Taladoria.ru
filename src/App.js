import React from 'react';
import './App.css';
import './Animations.css'
import { routerDeleverItems } from './routes';
import { RouterProvider } from 'react-router-dom';
import AppWrapper from './components/Wrappers/AppWrapper/AppWrapper';
import AuthProvider from './components/Auth/AuthProvider';
import { ImageLightboxProvider } from './components/ImageLightbox/ImageLightbox';

function App() {
  return (
    <div className="App" >
      <AppWrapper>
        <AuthProvider>
          <ImageLightboxProvider>
            <RouterProvider router={routerDeleverItems} />
          </ImageLightboxProvider>
        </AuthProvider>
      </AppWrapper>
    </div>
  );
}

export default App;
