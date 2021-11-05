import React from 'react';
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

  const userComponents = users.map((user) => {
    //   console.log(users, user)
    return (
      <li key={user?.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
