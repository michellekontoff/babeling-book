
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import './navbar.css'

const NavBar = () => {
    const user = useSelector(state => state.session.user)
    const [showNav, setShowNav] = useState(false)

    if (!user) return null;

    /* 
        Logo button - on click opens side bar.
            - toggle shownav when clicked
        if shownav is false, only show button
        if shownav is true, show navbar
    */


  return (
    <div className='navbar'>
        <button onClick={() => setShowNav(!showNav)}>Open/Close</button>
        <nav className='nav-links' style={!showNav ? {transform: 'translateX(250px)'} : {}}>
            <ul className='nav-links__list'>
                <li><NavLink to={`/users/${user.id}`} activeClassName='navbar--active'>Your Profile</NavLink></li>
                <li><NavLink to='/posts' activeClassName='navbar--active'>Latest Posts</NavLink></li>
                <li><NavLink to='/posts/new' activeClassName='navbar--active'>Create New Post</NavLink></li>
            </ul>
            {/* <div className='navbar__search'>
                <input placeholder='To be implemented...'></input>
            </div> */}
    </nav>
    </div>
  );
}

export default NavBar;
