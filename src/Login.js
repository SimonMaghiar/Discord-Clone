import { Button } from '@mui/material';
import React from 'react'
import './Login.css';
import { auth, Googleprovider } from './firebase';

function Login() {

    const signIn = () => {
        // do clever google login shizz...
        auth.signInWithPopup(Googleprovider).catch( (error) => alert(error.message));
    }

    return <div className="login">
        <div className="login__logo">
            <img src="https://cdn.arstechnica.net/wp-content/uploads/2017/08/Discord-LogoWordmark-Color.png" alt="" />
        </div>

        <Button onClick={signIn}>Sign In</Button>
    </div>
}

export default Login
