import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import {login, logout} from './features/userSlice';
import { display } from '@mui/system';

function App() {
  const dispath = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged( (user) => {
      console.log("HERE", user);
      if(user) {
        // the user is logged in
        dispath(login({
          uid: user.uid,
          photo: user.photoURL,
          email: user.email, 
          displayName: user.displayName,
        }))
      }else {
        // the user is logged out
        dispath(logout());
      }
    })
  },[dispath]) //Use dispath otherwise you get a warning

  return (
    <div className="app">
      {user ? (
        <>
         <Sidebar />
         <Chat />
        </>
      ): (
        <Login />
      )}
    </div>
  );
}

export default App;
