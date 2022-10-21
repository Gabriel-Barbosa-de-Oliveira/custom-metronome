import './App.scss';
import Metronome from './components/Metronome/Metronome';
import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  RouterProvider,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Landing from './components/Landing/Landing';
import Authenticator from './components/Authenticator/Authenticator';
import { ToastContainer } from 'react-toastify';
// import HeaderMenu from './shared/partials/HeaderMenu/HeaderMenu';
import { authContext } from './shared/context/authContext';
import { IUser } from './shared/interfaces/context/User.interface';
import { BackendService } from './services/backend/BackendService';
import Footer from './partials/Footer/Footer';
import { useLocation } from 'react-router-dom'
import PlaylistForm from './components/Playlists/Playlists';
import { ToastrService } from './shared/services/Toastr.service';

function App() {
  const [user, setUser] = useState<IUser | null>(checkLoggedUserFromSessionStorage());

  useEffect(() => {
    try {
      const {authenticatedUser} = (authenticateUser() as any);
      if (authenticatedUser) {
        setUser(authenticatedUser)
        sessionStorage.setItem("user", JSON.stringify(authenticatedUser));
      }
    } catch {
      onSignOut();
    }
  }, []);

  function checkLoggedUserFromSessionStorage() {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  async function authenticateUser() {
    return await new BackendService().create("/login", user);
  }

  function onSignOut() {
    setUser(null);
  }

  // const header = <HeaderMenu />;
  // const footer = <Footer />;

  return (
    <authContext.Provider value={{ user, onSignOut }}>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/metronome' element={<Metronome user={user} />} />
          <Route path='/login' element={<Authenticator cardState='login' onSignIn={setUser} />} />
          <Route path='/new-user' element={<Authenticator cardState='new-user' />} />
          <Route
            path="/new-playlist"
            element={
              <RequireAuth>
                <PlaylistForm />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </authContext.Provider>
  );
}

function useAuth() {
  return React.useContext(authContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    new ToastrService().notifyWarn("Para acessar esta página é necessário estar logado !");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default App;


