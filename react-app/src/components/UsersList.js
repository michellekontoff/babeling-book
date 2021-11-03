import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList({ users }) {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch('/api/users/');
//       const responseData = await response.json();
//       setUsers(responseData.users);
//     }
//     fetchData();
//   }, []);

  const userComponents = users?.map((user) => {
      console.log(users, user)
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
