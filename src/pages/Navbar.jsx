import React, { useContext } from 'react'

import './navbar.css';

import { AuthContext } from '../context/AuthContext';
// import { current } from '@reduxjs/toolkit';
import { Lang } from './../localization/fi';
// import { Lang } from './../localization/en';

const Navbar = () => {
    
    const {dispatch} = useContext(AuthContext);

    const {currentUser} = useContext(AuthContext);
    console.log("Nykyinen käyttäjä NAVBAR ", currentUser)

    return (

        <>
            
                {Lang.map((data, key) => {
                    return (
                        <div key={key} className="navBar">
                            <h2>Logo</h2>
                            <a href="http://localhost:3000/users/">{data.navBarUsers}</a>
                            <a href="http://localhost:3000/homepage/">{data.navBarHome}</a>
                            <a href="http://localhost:3000/frontpage/">{data.navBarFront}</a>
                            <a href="http://localhost:3000/login/">{data.navBarLogin}</a>
                            <p>{currentUser ? currentUser.email : 'Not logged in'}</p>
                            <button onClick={ () => dispatch({type:"LOGOUT"})}>{data.navBarButton}</button>
                        </div>
                    )
                })}
            
        </>

    )
}

export default Navbar