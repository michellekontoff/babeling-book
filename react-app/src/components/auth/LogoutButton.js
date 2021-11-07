import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({showNav, setShowNav}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <a className="logout-btn" onClick={onLogout}>Logout</a>;
};

export default LogoutButton;
