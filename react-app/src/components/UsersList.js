import React from 'react';
import { NavLink } from 'react-router-dom';

function UsersList({ users }) {
  const userList = users.map((user) => {
    return (
      <li key={user?.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <ul>{userList}</ul>
    </>
  );
}

export default UsersList;
