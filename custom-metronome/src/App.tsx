import './App.scss';
import Metronome from './components/Metronome/Metronome';
import ReactDOM from "react-dom/client";
import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Landing from './components/Landing/Landing';
import Authenticator from './components/Authenticator/Authenticator';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/metronome",
    element: <Metronome />
  },
  {
    path: "/login",
    element: <Authenticator cardState='login' />
  },
  {
    path: "/new-user",
    element: <Authenticator cardState='new-user' />
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
