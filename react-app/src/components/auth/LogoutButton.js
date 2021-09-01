import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({showNav, setShowNav}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    //   console.log(setShowNav)
    //   setShowNav(!showNav)
    await dispatch(logout());
  };

  return <button id="logout-btn" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
