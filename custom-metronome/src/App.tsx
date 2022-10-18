import './App.scss';
import Metronome from './components/Metronome/Metronome';
import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  RouterProvider,
  Route,
  Routes,
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

function App() {
  const [user, setUser] = useState<IUser | null>(checkLoggedUserFromSessionStorage());

  useEffect(() => {
    try {        
        console.log(user)
        const data = (getUser() as any);
        if(data){
          setUser(data)
        }
    } catch {
      onSignOut();
    }
  }, []);

  function checkLoggedUserFromSessionStorage(){
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  async function getUser() {
    return await new BackendService().read("/session/user", user);
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
          </Routes>
      </Router>
      <ToastContainer />
    </authContext.Provider>
  );
}


export default App;
