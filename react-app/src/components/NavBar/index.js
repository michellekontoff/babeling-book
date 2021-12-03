import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Footer from '../Footer';
import SearchBar from '../Search/SearchBar';
import logo from '../../images/bb-logo-closed.png';

import { toggleNavBar } from '../../store/session';

import './navbar.css';

const NavBar = () => {
   const user = useSelector((state) => state.session.user);
   const showNav = useSelector((state) => state.session.showNav);
   const [windowSize, setWindowSize] = useState(window.innerWidth)


   const dispatch = useDispatch();
   const location = useLocation();

//    window.addEventListener('resize', handleResize)
   
//    function handleResize() {
//        console.log('i ran')
//         if (windowSize >= 1000 && window.innerWidth < 1000) {
//             setWindowSize(window.innerWidth)
//         } else if (windowSize < 1000 && window.innerWidth >= 1000) {
//             setWindowSize(window.innerWidth)
//         }
//    }

//    handleResize()

//    useEffect(handleResize)

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [location]);


   if (!user) {
      return null;
   }

   return (
      <>
         <div className='navbar'>
            <button
               className='navbar__logo-btn'
               style={(user.username.length > 20 && windowSize > 1000) ? { top: 120 } : {}}
               onClick={() => dispatch(toggleNavBar(!showNav))}
            >
               <img className='logo' src={logo} alt='logo' />
            </button>
            <nav
               className='nav-links'
               style={!showNav ? { transform: 'translateY(-580px)' } : {}}
            >
               <div className='navbar__hello'>
                  <h2>Hello,</h2>
                  <h2>{user.username}</h2>
               </div>

               <ul className='nav-links__list'>
                  <li>
                     <NavLink
                        to={`/users/${user.id}`}
                        activeClassName='navbar--active'
                     >
                        Your Posts
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to='/posts/latest'
                        activeClassName='navbar--active'
                     >
                        Latest Posts
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to='/posts/new' activeClassName='navbar--active'>
                        Create New Post
                     </NavLink>
                  </li>
                  <li>
                     <LogoutButton />
                  </li>
               </ul>

               <SearchBar />

               <div className='nav-footer'>
                  <Footer />
               </div>
            </nav>
         </div>
         <div
            id='fullscreen-footer'
            style={location.pathname === '/' ? { display: 'none' } : {}}
         >
            <Footer />
         </div>
      </>
   );
};

export default NavBar;
