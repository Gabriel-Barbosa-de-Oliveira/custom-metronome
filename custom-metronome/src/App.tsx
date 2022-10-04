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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/metronome",
    element: <Metronome />
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
