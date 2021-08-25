import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

export default function Homepage() {
    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to={`/users/${user.id}`} />;
      }

    return (
        <p>Welcome!</p>
    )
}
