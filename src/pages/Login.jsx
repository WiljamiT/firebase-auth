import React, { useState, useContext } from 'react'
import './login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';



   


const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {dispatch} = useContext(AuthContext);
    const {currentUser} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({type:"LOGIN", payload:user})
                console.log("Login ", user);
                navigate("/frontpage");
            })
            .catch((error) => {
                setError(true);
            });
    }
    

    

  return (
    <>
    <Navbar />
        <div className="login">
            {currentUser ? 'Olet jo kirjautunut sisään' : 
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} />

                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} /> 

                    <button type="submit">Login</button>
                    {error ? <span>Wrong email or password</span> : null} 
                </form>} 
        </div>
    </>
  )
}

export default Login;
